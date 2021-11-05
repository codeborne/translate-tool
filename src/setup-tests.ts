import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chai from 'chai'
import type {MochaOptions} from 'mocha'

chai.use(sinonChai)

// @ts-ignore
window['__WTR_CONFIG__'].testFrameworkConfig = {
  rootHooks: {
    // beforeEach: () => stub(window, 'fetch').returns(new Promise(() => {})),
    afterEach: () => sinon.restore()
  }
} as MochaOptions
