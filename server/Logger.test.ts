import logger from './Logger'
import {spy, stub} from 'sinon'
import {expect} from 'chai'

describe('Logger', () => {
  const date = Date.parse('9 April 2020 16:30:00')

  beforeEach(() => {
    stub(Date, 'now').returns(date)
  })

  it('outputs error', async () => {
    const log = spy(console, 'error')
    logger.error('a test error')
    expect(log).calledWith('[2020-04-09 16:30] [ERROR] a test error')
  })

  it('outputs info log', async () => {
    const log = spy(console, 'info')
    logger.info('an info log')
    expect(log).calledWith('[2020-04-09 16:30] [INFO] an info log')
  })

  it('outputs regular log', async () => {
    const log = spy(console, 'log')
    logger.log('some kind of intended log')
    expect(log).calledWith('[2020-04-09 16:30] some kind of intended log')
  })
})
