import logger from './Logger'
import sinon from 'sinon'
import {expect} from 'chai'

describe('Logger', () => {
  it('outputs error', async () => {
    const log = sinon.spy(console, 'error')
    logger.error('an error')
    expect(log.calledWithMatch('outputs error')).to.be.true
  })
})
