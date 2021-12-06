import {totalKeys, getTotalFilledKeys} from './languageStats'
import {expect} from 'chai'

describe('getTotalKeys', () => {
  it('returns correct total count', () => {
    const dict = totalKeys({
      t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}})
    expect(dict).to.deep.equal(6)
    expect(totalKeys({})).to.deep.equal(0)
    expect(totalKeys({hello: 'world', nested: {hello: 'Another World'}})).to.deep.equal(2)
  })
})

describe('getTotalFilledKeys', () => {
  it('returns correct total count with filled fields', () => {
    const dict = getTotalFilledKeys({
      "1": 1, "2": 2, "obj1": {"3": 3, "4": '', "obj2": {"5": '', "6": ''}}})
    expect(dict).to.deep.equal(3)
  })
})