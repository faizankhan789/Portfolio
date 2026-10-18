import { expect, test } from '@playwright/test'
import { services } from '../src/data/services'

const HEADINGS = [/^intro$/i, /^what i can do$/i, /^selected work$/i, /^experience$/i, /^credentials$/i]

test.beforeEach(async ({ page }) => {
  await page.route('**/fonts.googleapis.com/**', (r) => r.abort())
  await page.route('**/fonts.gstatic.com/**', (r) => r.abort())
})

test('no horizontal overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y <= height; y += 500) {
    await page.mouse.wheel(0, 500)
    await page.waitForTimeout(60)
  }
  await page.waitForTimeout(500)
  const w = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(w).toBeLessThanOrEqual(320)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no preloader, all h2 visible at opacity 1', async ({ page }) => {
    await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
    await expect(page.locator('[data-preloader]')).toHaveCount(0)
    const h2s = page.locator('section h2')
    expect(await h2s.count()).toBeGreaterThanOrEqual(5)
    for (const h of await h2s.all()) {
      await expect(h).toBeVisible()
      expect(await h.evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
    }
  })
})

test.describe('javascript disabled', () => {
  test.use({ javaScriptEnabled: false })
  test('prerendered content has name and headings', async ({ page }) => {
    await page.goto('/Portfolio/')
    await expect(page.getByRole('heading', { level: 1, name: /Muhammad Faizan Khan/i })).toBeAttached()
    for (const name of HEADINGS) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeAttached()
    }
    await expect(page.getByText('Muhammad Faizan Khan').first()).toBeAttached()
    await expect(page.getByText(services[0].summary)).toBeVisible()
  })
})

test.describe('keyboard', () => {
  test.use({ viewport: { width: 1280, height: 800 } })
  test('Tab reaches nav link', async ({ page }) => {
    await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
    let found = false
    for (let i = 0; i < 4 && !found; i++) {
      await page.keyboard.press('Tab')
      found = await page.evaluate(() => !!document.activeElement?.closest('nav a[href^="#"]'))
    }
    expect(found).toBe(true)
  })
  test('End reaches footer', async ({ page }) => {
    await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
    await expect(page.locator('[data-preloader]')).toHaveCount(0, { timeout: 8000 })
    await page.keyboard.press('End')
    await expect(page.locator('footer')).toBeInViewport({ timeout: 5000 })
  })
})

test('no console errors on load at 1280x800', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text() + m.location().url)) errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  expect(errors).toEqual([])
})

test('visual pass screenshots', async ({ page }) => {
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    await page.setViewportSize({ width: w, height: h })
    await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(3500)
    await page.screenshot({ path: `output/playwright/final-${w}.png`, fullPage: true })
  }
})
