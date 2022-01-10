import {expect, test} from '@playwright/test'
import {url} from './config.js'

async function fillPublicImport(page) {
  await expect(page.locator('.collapsePublic')).toBeVisible()
  await page.locator('.collapsePublic input:nth-of-type(1)').fill('EditorTest')
  await page.locator('.collapsePublic input:nth-of-type(2)').fill('https://raw.githubusercontent.com/Uptaker/i18n-public/main/i18n/')
  await page.locator('.collapsePublic button').click()
  await expect(page.locator('.collapsePublic')).not.toBeVisible()
}

test('can edit project config', async ({page}) => {
  await page.goto(url)
  await expect(page.locator('#top h3')).toContainText('Translation Tool')
  await fillPublicImport(page)
  await expect(page.locator('text=Project Settings')).toBeVisible()
  await page.locator('text=Project Settings').click()
  await expect(page.locator('text=Back to editor')).toBeVisible()
  await expect(page.locator('#rawOutput')).not.toBeVisible()
})