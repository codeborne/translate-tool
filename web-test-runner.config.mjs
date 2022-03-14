process.env.NODE_ENV = 'test'

import vite from 'vite-web-test-runner-plugin'
import {chromeLauncher} from '@web/test-runner'

const ignoredBrowserLogs = [
  '[vite] connecting...',
  '[vite] connected.',
]

export default {
  browserStartTimeout: 20000,
  testsFinishTimeout: 10000,
  plugins: [vite()],
  browsers: [chromeLauncher({launchOptions: {dumpio: !!process.env.DUMP_CHROME_OUT, args: process.env.TEST_CHROME_ARGS?.split(' ')}})],
  testRunnerHtml: testFramework =>
    `<html>
      <body>
        <script type="module">
          window.global = window
          window.process = { env: {NODE_ENV: 'test'} }
        </script>
        <script type="module" src="/src/setup-tests.ts"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
  filterBrowserLogs: ({args}) => {
    return !args.some((arg) => ignoredBrowserLogs.includes(arg))
  }
}
