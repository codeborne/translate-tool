process.env.NODE_ENV = 'test'

import {chromeLauncher} from '@web/test-runner'

export default {
  testsFinishTimeout: 5000,
  plugins: [require('@snowpack/web-test-runner-plugin')()],
  browsers: [chromeLauncher({launchOptions: {args: process.env.TEST_CHROME_ARGS?.split(' ')}})],
  testRunnerHtml: testFramework =>
    `<html>
      <body>
        <script type="module" src="/dist/setup-tests.js"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`
}
