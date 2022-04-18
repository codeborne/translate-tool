import logger from './Logger'
import Logger from './Logger'
import sinon, {stub} from 'sinon'
import {expect} from 'chai'

const date = Date.parse('9 April 2020 16:30:00 GMT')
  beforeEach(() => {
    stub(Date, 'now').returns(date)
  })

describe('Logger', () => {
  it('outputs error', async () => {
    const log = sinon.spy(console, 'error')
    logger.error('an error')
    expect(log.calledWith('[2020-3-1 16:30] [ERROR] an error')).to.be.true
  })

  it('outputs info log', async () => {
    const log = sinon.spy(console, 'info')
    logger.info('an info log')
    expect(log.calledWith('[2020-3-1 16:30] [INFO] an info log')).to.be.true
  })

  it('outputs regular log', async () => {
    const log = sinon.spy(console, 'log')
    logger.log('some kind of log')
    expect(log.calledWith('[2020-3-1 16:30] some kind of log')).to.be.true
  })
})
