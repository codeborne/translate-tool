import {expect, test} from '@playwright/test'
import {url} from './config.js'

test('import', async ({page}) => {
  await page.goto(url)
  await expect(page.locator('#top h3')).toContainText('Translation Tool')
  await expect(page.locator('.collapsePublic')).toBeVisible()
  await page.locator('.collapsePublic input:nth-of-type(1)').fill('E2E')
  await page.locator('.collapsePublic input:nth-of-type(2)').fill('https://raw.githubusercontent.com/Uptaker/i18n-public/main/i18n/')
  await page.locator('.collapsePublic button').click()

  await expect(page.locator('#output')).toBeVisible()
  await expect(page.locator('#backToImporterBtn')).toBeVisible()
  await expect(page.locator('#backToImporterBtn')).toContainText('Project Settings')
  await expect(page.locator('nav .form-select')).toBeVisible()
  await expect(page.locator('nav .nav-link')).toBeVisible()
  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('E2E')
  await expect(page.locator('nav .nav-link:nth-of-type(2)')).not.toBeVisible()
})