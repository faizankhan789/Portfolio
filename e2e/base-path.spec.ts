import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/fonts.googleapis.com/**', (r) => r.abort())
  await page.route('**/fonts.gstatic.com/**', (r) => r.abort())
})

test('serves under /Portfolio/ with no failed requests', async ({ page }) => {
  const failures: string[] = []
  const isFont = (u: string) => /fonts\.(googleapis|gstatic)\.com/.test(u)
  page.on('requestfailed', (r) => {
    if (!isFont(r.url())) failures.push(`FAILED ${r.url()}`)
  })
  page.on('response', (r) => {
    if (r.status() >= 400 && !isFont(r.url())) failures.push(`${r.status()} ${r.url()}`)
  })

  await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
  await expect(page.locator('h1')).toBeVisible()
  expect(failures).toEqual([])

  const resume = await page.request.get('/Portfolio/Resume.pdf')
  expect(resume.status()).toBe(200)
})
