import {expect} from 'chai'
import Filter from './Filter'

describe('Filter', () => {

  let filter: Filter = new Filter('test', false)

  it('filters searching string', async () => {
    expect(filter.shouldShow('app.test', 'someValue')).to.be.true
    expect(filter.shouldShow('mixedcaseTeSt', 'someValue')).to.be.true
    expect(filter.shouldShow('app.nothing', 'nothing')).to.be.false
  })

  it('returns true on filtered empty values', async () => {
    filter.showEmptyValuesOnly = true
    expect(filter.shouldShow('app.test', 'someValue')).to.be.false
    expect(filter.shouldShow('mixedcaseTeSt', 'someValue')).to.be.false
    expect(filter.shouldShow('app.empty', '')).to.be.false
    expect(filter.shouldShow('app.test', '')).to.be.true
  })
})
