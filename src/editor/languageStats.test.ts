import {totalDifferentValues, totalKeys} from './languageStats'
import {expect} from 'chai'

describe('totalKeys', () => {
  it('counts total keys recursively', () => {
    const dict = totalKeys({t1: '1', t2: '2', t: {t3: '3', t4: '4', t: {t5: '5', t6: '6'}}})
    expect(dict).to.deep.equal(6)
    expect(totalKeys({})).to.deep.equal(0)
    expect(totalKeys({hello: 'world', nested: {hello: 'Another World'}})).to.deep.equal(2)
  })
})

describe('totalDifferentValues', () => {
  it('counts total different key values recursively', () => {
    const original = {t1: '1', t2: '2', t: {t3: '3', t4: '4', t: {t5: '5', t6: '6'}}}
    const comparedWith = {t1: '1', t2: '2', t: {t3: '3', t4: '4', t: {t5: '', t6: 'new value'}}}
    expect(totalDifferentValues(original, comparedWith)).to.equal(2)

  })
})
