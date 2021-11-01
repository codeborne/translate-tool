import {getTotalDictCount, getFilledDictCount} from './languageStats'
import {expect} from 'chai'

describe('getTotalDictAmount', () => {
  it('returns correct total count', () => {
    const dict = getTotalDictCount({
      "1": 1, "2": 2, "obj1": {"3": 3, "4": 4, "obj2": {"5": 5, "6": 6}}})
    expect(dict).to.deep.equal(6)
  })
})

describe('getFilledDictCount', () => {
  it('returns correct total count with filled fields', () => {
    const dict = getFilledDictCount({
      "1": 1, "2": 2, "obj1": {"3": 3, "4": '', "obj2": {"5": '', "6": ''}}})
    expect(dict).to.deep.equal(3)
  })
})