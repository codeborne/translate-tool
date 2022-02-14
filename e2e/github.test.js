import {expect, test} from '@playwright/test'
import {projectGithub, url} from './config.js'

async function handlePrompt(dialog) {
  await expect(dialog.message).toBe('Commit message (what have you changed?)')
  await dialog.accept(`Commit from E2E tests on ${new Date().toLocaleString()}`)
}

test('can commit to github', async ({page}) => {
  await page.goto(`${url}/?shared=${projectGithub}`)
  await expect(page.locator('.nav-logo')).toBeVisible()
  await expect(page.locator('.nav-link:first-of-type')).toContainText('TestProject')
  await expect(page.locator('text=Save to translations branch')).toBeVisible()
  await page.once('dialog', dialog => dialog.accept(`Commit from E2E tests on ${new Date().toLocaleString()}`))
  await page.locator('text=Save to translations branch').click()
  await page.once('dialog', dialog => dialog.accept())
})
