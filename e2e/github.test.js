import {expect, test} from '@playwright/test'
import {github_project, url} from './config.js'

test('can commit to github', async ({page}) => {
  await page.goto(`${url}/?shared=${github_project}`)
  await expect(page.locator('#top h3')).toContainText('Translation Tool')
  await expect(page.locator('nav .nav-link:first-of-type')).toContainText('TestProject')
})