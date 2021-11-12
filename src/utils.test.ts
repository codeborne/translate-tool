import {areObjectsEqual} from './utils'
import {expect} from 'chai'

describe('areObjectsEqual', () => {
  it('returns true if objects are equal, false if not', () => {
    let obj1 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}}
    let obj2 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}}
    expect(areObjectsEqual(obj1, obj2)).to.equal(true)

    let obj3 = {t1: 1}
    let obj4 = {t1: 1}
    expect(areObjectsEqual(obj3, obj4)).to.equal(true)

    let obj5 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 7}}}
    let obj6 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}}
    expect(areObjectsEqual(obj5, obj6)).to.equal(false)

    let obj7 = {t1: 1, t2: 'weeeoo', t: {t3: 3, t4: 4, t: {t5: 5, t6: 7}}}
    let obj8 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 'beooo'}}}
    expect(areObjectsEqual(obj7, obj8)).to.equal(false)

    let obj9 = {}
    let obj10 = {}
    expect(areObjectsEqual(obj9, obj10)).to.equal(true)
  })
})