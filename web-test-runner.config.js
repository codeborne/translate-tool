process.env.NODE_ENV = 'test'

module.exports = {
  testsFinishTimeout: 5000,
  plugins: [require('@snowpack/web-test-runner-plugin')()],
  testRunnerHtml: testFramework =>
    `<html>
      <body>
        <script type="module" src="/dist/setup-tests.js"></script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`
}
