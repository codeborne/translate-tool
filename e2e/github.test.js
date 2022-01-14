import {expect, test} from '@playwright/test'
import {githubProject, url} from './config.js'

async function handlePrompt(dialog) {
  await expect(dialog.message).toBe('Commit message (what have you changed?)')
  await dialog.accept(`Commit from E2E tests on ${new Date().toLocaleString()}`)
}

test('can commit to github', async ({page}) => {
  await page.goto(`${url}/?shared=${githubProject}`)
  await expect(page.locator('#top h3')).toContainText('Translation Tool')
  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('TestProject')
  await expect(page.locator('text=Save to translations branch')).toBeVisible()
  await page.once('dialog', dialog => dialog.accept(`Commit from E2E tests on ${new Date().toLocaleString()}`))
  await page.locator('text=Save to translations branch').click()
  await page.once('dialog', dialog => dialog.accept())
})