import {expect, test} from '@playwright/test'
import {url} from './config.js'

async function fillPublicImport(page) {
  await page.locator('.addNew').click()
  await page.locator('.publicImport input:nth-of-type(1)').fill('EditorTest')
  await page.locator('.publicImport input:nth-of-type(2)').fill(url + '/i18n/')
  await page.locator('.publicImport .btn').click()
}

test('editor page functionality', async ({page}) => {
  await page.goto(url)
  await expect(page.locator('.nav-logo')).toBeVisible()
  await fillPublicImport(page)
  await expect(page.locator('.num-changes')).not.toBeVisible()
  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('EditorTest')
  await expect(page.locator('table .form-control').first()).toContainText('Public Testing')
  expect(await page.inputValue('#rawOutput')).toContain('Public Testing')

  await page.locator('table .form-control').first().fill('Changed! Abcdefghijklmnopqrstuvwxyz')
  await page.locator('body').click()
  await expect(page.locator('table .form-control').first()).toContainText('Changed! Abcdefghijklmnopqrstuvwxyz')
  expect(await page.inputValue('#rawOutput')).toContain('Changed! Abcdefghijklmnopqrstuvwxyz')
  expect(await page.inputValue('#rawOutput')).not.toContain('Public Testing')

  await expect(page.locator('.num-changes')).toBeVisible()
  await expect(page.locator('.num-changes')).toContainText('1 change')
  await page.locator('table .form-control').last().fill('other change')
  await page.locator('body').click()
  await expect(page.locator('.num-changes')).toContainText('2 changes')
  await page.locator('table .form-control').last().fill('Submit')
  await page.locator('table .form-control').first().fill('Public Testing')
  await page.locator('body').click()
  await expect(page.locator('.num-changes')).not.toBeVisible()

  await page.locator('table .form-control').last().fill('to be saved')
  await page.locator('[href="#output"]').click()
  await expect(page.locator('.num-changes')).toContainText('1 change')
  expect(await page.inputValue('#rawOutput')).toContain('to be saved')
  await page.locator('text=clipboard').click()
  await page.on('dialog', dialog => dialog.dismiss())
  await expect(page.locator('.num-changes')).not.toBeVisible()

  await page.locator('table .form-control').first().fill('Will stay after changing language')
  await page.locator('nav .form-select').selectOption({label: 'de'})
  await page.locator('body').click()
  await expect(page.locator('thead th:nth-of-type(2)')).toContainText('de')
  await expect(page.locator('thead th:nth-of-type(3)')).toContainText('en')
  expect(await page.inputValue('#rawOutput')).not.toContain('Will stay after changing language')
  await page.locator('nav .form-select').selectOption({label: 'en'})
  await page.locator('body').click()
  await expect(page.locator('thead th:nth-of-type(2)')).toContainText('en')
  expect(await page.inputValue('#rawOutput')).toContain('Will stay after changing language')
})

