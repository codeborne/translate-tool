import {expect, test} from '@playwright/test'
import {url} from './config.js'

async function fillPublicImport(projectName, page) {
  await page.locator('.addNew').click()
  await page.locator('.publicImport').click()
  await page.locator('.collapsePublic input:nth-of-type(1)').fill(projectName)
  await page.locator('.collapsePublic input:nth-of-type(2)').fill(url + '/i18n/')
  await page.locator('.collapsePublic button').click()
}

test('import public twice', async ({page}) => {
  await page.goto(url)
  await expect(page.locator('.nav-logo')).toBeVisible()
  await fillPublicImport("E2E", page)

  await expect(page.locator('#output')).toBeVisible()
  await expect(page.locator('#backToImporterBtn')).toBeVisible()
  await expect(page.locator('#backToImporterBtn')).toContainText('Project Settings')
  await expect(page.locator('nav .form-select')).toBeVisible()
  await expect(page.locator('nav .nav-link')).toBeVisible()
  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('E2E')
  await expect(page.locator('nav .nav-link:nth-of-type(2)')).not.toBeVisible()

  await page.locator('[title="Add a new project"]').click()
  await expect(page.locator('.collapsePublic')).toBeVisible()
  await fillPublicImport("OtherDict", page)
  await expect(page.locator('.collapsePublic')).not.toBeVisible()
  await expect(page.locator('#output')).toBeVisible()
  await expect(page.locator('nav .nav-link:nth-of-type(1)')).toContainText('E2E')
  await expect(page.locator('nav .nav-link:nth-of-type(2)')).toContainText('OtherDict')
  await expect(page.locator('nav .nav-link:nth-of-type(3)')).not.toBeVisible()
})
