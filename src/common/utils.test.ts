import {containsHTMLTags, decodeBase64Unicode, deepEqual, encodeBase64Unicode, insertNestedKey} from './utils'
import {expect} from 'chai'

describe('areObjectsEqual', () => {
  it('returns true if objects are equal, false if not', () => {
    let obj1 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}}
    let obj2 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}}
    expect(deepEqual(obj1, obj2)).to.equal(true)

    let obj3 = {t1: 1}
    let obj4 = {t1: 1}
    expect(deepEqual(obj3, obj4)).to.equal(true)

    let obj5 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 7}}}
    let obj6 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 6}}}
    expect(deepEqual(obj5, obj6)).to.equal(false)

    let obj7 = {t1: 1, t2: 'weeeoo', t: {t3: 3, t4: 4, t: {t5: 5, t6: 7}}}
    let obj8 = {t1: 1, t2: 2, t: {t3: 3, t4: 4, t: {t5: 5, t6: 'beooo'}}}
    expect(deepEqual(obj7, obj8)).to.equal(false)

    let obj9 = {}
    let obj10 = {}
    expect(deepEqual(obj9, obj10)).to.equal(true)

    let obj11 = {name: 'a', nested: {}}
    let obj12 = {name: 'a', nested: {}}
    let obj13 = {name: 'a', nested: {test:'test'}}
    expect(deepEqual(obj11, obj12)).to.equal(true)
    expect(deepEqual(obj11, obj13)).to.equal(false)
  })
})

describe('encode/decodeBase64Unicode', () => {
  it('encodes and decodes UTF-8 base64', () => {
    expect(encodeBase64Unicode('õun')).to.eq('w7V1bg==')
    expect(decodeBase64Unicode('w7V1bg==')).to.eq('õun')
  })
})

describe('insertNestedKey', () => {
  it('adds a new key in specified order to an object', () => {
    const dict = {x: '1', aa: '10', v: '3'}
    insertNestedKey(dict, 'z', 1)
    expect(JSON.stringify(dict)).to.eq(`{"x":"1","aa":"10","z":"","v":"3"}`)
  })

  it('adds a new nested key, separated by dots', () => {
    const dict = {x: '1', aa: '10', v: '3'}
    insertNestedKey(dict, 'hello.world.baz', 1)
    expect(JSON.stringify(dict)).to.eq(`{"x":"1","aa":"10","hello":{"world":{"baz":""}},"v":"3"}`)
  })

  it('adds a new deep key to existing sub keys', () => {
    const dict = {x: {y: {z: '1'}}}
    insertNestedKey(dict, 'x.y.zz', 1)
    expect(JSON.stringify(dict)).to.eq(`{"x":{"y":{"z":"1","zz":""}}}`)
  })
})

describe('containsHTMLTags', () => {
  it('given strings do not contain HTML', () => {
    let html = 'this is a test'
    expect(containsHTMLTags(html)).to.be.false
    html = 'this is a test ////'
    expect(containsHTMLTags(html)).to.be.false
    html = 'with {url} now'
    expect(containsHTMLTags(html)).to.be.false
  })
  it('given strings contain HTML', () => {
    let html = 'this is a <p>test</p>'
    expect(containsHTMLTags(html)).to.be.true
    html = 'this is a <br> test'
    expect(containsHTMLTags(html)).to.be.true
    html = 'this is a <a href="someurl"> test>'
    expect(containsHTMLTags(html)).to.be.true
    html = '<div>broken html'
    expect(containsHTMLTags(html)).to.be.true
  })
})
