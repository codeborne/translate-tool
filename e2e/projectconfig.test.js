import {expect, test} from '@playwright/test'
import {url} from './config.js'

async function fillPublicImport(page) {
  await page.locator('.collapsePublic input:nth-of-type(1)').fill('ConfigTest')
  await page.locator('.collapsePublic input:nth-of-type(2)').fill(url + '/i18n/')
  await page.locator('.collapsePublic button').click()
  await expect(page.locator('.collapsePublic')).not.toBeVisible()
}

test('can edit project config', async ({page}) => {
  await page.goto(url)
  await expect(page.locator('.nav-logo')).toBeVisible()
  await fillPublicImport(page)
  await expect(page.locator('text=Project Settings')).toBeVisible()
  await page.locator('text=Project Settings').click()
  await expect(page.locator('.backBtn')).toBeVisible()
  await expect(page.locator('#rawOutput')).not.toBeVisible()

  await page.locator('.backBtn').click()
  await expect(page.locator('#rawOutput')).toBeVisible()
  await page.locator('text=Project Settings').click()
  await expect(page.locator('#rawOutput')).not.toBeVisible()

  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('ConfigTest')
  expect(await page.inputValue('.name-input')).toBe('ConfigTest')
  expect(await page.inputValue('.indent-input')).toBe('2')
  expect(await page.inputValue('.url-input')).toBe(url + '/i18n/')
  expect(await page.inputValue('.token-input')).toBe('')

  await page.locator('.name-input').fill('nameIsChanged')
  await page.locator('text=Save').click()
  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('nameIsChanged')
  await page.once('dialog', dialog => dialog.dismiss())
  await page.locator('text=Share').click()

  await expect(page.locator('[title="Add a new project"]')).toBeVisible()
  await page.once('dialog', dialog => dialog.accept())
  await page.locator('text=Delete').click()
  await expect(await page.locator('[title="Add a new project"]')).not.toBeVisible()
  await expect(await page.locator('nav .nav-link')).not.toBeVisible()
})
