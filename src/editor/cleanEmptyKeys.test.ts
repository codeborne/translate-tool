import {cleanEmptyKeys} from './cleanEmptyKeys'
import {expect} from 'chai'

describe('cleanEmptyKeys', () => {
  it('removes keys with empty values', () => {
    let dict = cleanEmptyKeys({hello: {empty: '', notEmpty: '123'}})
    expect(dict).to.deep.equal({hello: {notEmpty: '123'}})
    dict = cleanEmptyKeys({"consents": "wee",
      "contacts": {},
      "currencySymbols": {},
      "general": {
        "filter": {}
      },
      "forbidden": {
        "forbidden1": {},
        "forbidden2": {},
        "forbidden3": {
          "nested1": {},
          "nested2": {},
          "nested3": {
            "more1": {},
            "more2": {},
            "more3": {}
          }
        }
      },
      "notfound": {},
      "person": {},
      "products": {
        "mainParams": {},
        "params": {},
        "availability": {}
      },
      "validation": {}
    })

    expect(dict).to.deep.equal({consents: 'wee'})
  })

  it('removes empty objects', () => {
    expect(cleanEmptyKeys({hello: {empty: {}, notEmpty: 1}})).to.deep.equal({hello: {notEmpty: 1}})
    expect(cleanEmptyKeys({hello: {empty: {}, notEmpty: {empty: ''}}})).to.deep.equal({})
  })
})
