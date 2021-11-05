import {getTotalDictCount, getFilledDictCount} from './languageStats'
import {expect} from 'chai'

describe('getTotalDictAmount', () => {
  it('returns correct total count', () => {
    const dict = getTotalDictCount({
      t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}})
    expect(dict).to.deep.equal(6)
    expect(getTotalDictCount({})).to.deep.equal(0)
    expect(getTotalDictCount({hello: 'world', nested: {hello: 'Another World'}})).to.deep.equal(2)
  })
})

describe('getFilledDictCount', () => {
  it('returns correct total count with filled fields', () => {
    const dict = getFilledDictCount({
      "1": 1, "2": 2, "obj1": {"3": 3, "4": '', "obj2": {"5": '', "6": ''}}})
    expect(dict).to.deep.equal(3)
  })
})