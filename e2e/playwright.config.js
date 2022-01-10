  /** @type {import('@playwright/test').PlaywrightTestConfig} */
export default {
  workers: 1,
  timeout: 90000,
  globalTimeout: 600000,
  use: {
    browserName: 'webkit',
    headless: !process.env.DISPLAY,
    screenshot: 'only-on-failure',
    actionTimeout: 20000,
    navigationTimeout: 20000,
  }
}