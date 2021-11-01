import {cleanEmptyKeys} from './cleanEmptyKeys'
import {expect} from 'chai'

describe('cleanEmptyKeys', () => {
  it('removes keys with empty values', () => {
    const dict = cleanEmptyKeys({hello: {empty: '', notEmpty: '123'}})
    expect(dict).to.deep.equal({hello: {notEmpty: '123'}})
  })

  it('removes empty objects', () => {
    expect(cleanEmptyKeys({hello: {empty: {}, notEmpty: 1}})).to.deep.equal({hello: {notEmpty: 1}})
    expect(cleanEmptyKeys({hello: {empty: {}, notEmpty: {empty: ''}}})).to.deep.equal({})
  })
})
