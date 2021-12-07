import {totalKeys} from './languageStats'
import {expect} from 'chai'

it('totalKeys', () => {
  const dict = totalKeys({t1: '1', t2: '2', t: {t3: '3', t4: '4', t: {t5: '5', t6: '6'}}})
  expect(dict).to.deep.equal(6)
  expect(totalKeys({})).to.deep.equal(0)
  expect(totalKeys({hello: 'world', nested: {hello: 'Another World'}})).to.deep.equal(2)
})
