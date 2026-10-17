import { expect, test } from '@playwright/test'

test('serves under /Portfolio/ with no failed requests', async ({ page }) => {
  const failures: string[] = []
  page.on('requestfailed', (r) => failures.push(`FAILED ${r.url()}`))
  page.on('response', (r) => {
    if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`)
  })

  await page.goto('/Portfolio/', { waitUntil: 'networkidle' })
  await expect(page.locator('h1')).toBeVisible()
  expect(failures).toEqual([])

  const resume = await page.request.get('/Portfolio/Resume.pdf')
  expect(resume.status()).toBe(200)
})
