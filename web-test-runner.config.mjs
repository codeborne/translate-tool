process.env.NODE_ENV = 'test'

import testRunner from '@snowpack/web-test-runner-plugin'
import {chromeLauncher} from '@web/test-runner'

export default {
  testsFinishTimeout: 5000,
  plugins: [testRunner()],
  browsers: [chromeLauncher({launchOptions: {dumpio: !!process.env.DUMP_CHROME_OUT, args: process.env.TEST_CHROME_ARGS?.split(' ')}})],
  testRunnerHtml: testFramework =>
    `<html>
      <body>
        <script type="module" src="/dist/setup-tests.js"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`
}
