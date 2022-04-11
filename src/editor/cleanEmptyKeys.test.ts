import {cleanEmptyKeys, rebuild} from './cleanEmptyKeys'
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

describe('rebuild', () => {

  const newObj = {
    level1: '',
    nest1: {
      nest2: {
        level2: 'l2',
        level5: 'l5',
        level3: 'l3new',
        nest3: {
          nest4: {
            level8: 'l8',
            level6: 'l6',
            level7: 'l7new',
            nest5: {
              level11: 'l11new',
              level9: 'l9',
              level12: 'l12',
              level10: 'l10new',
            }
          }
        }
      }
    }
  }

  const defaultObj = {
    level1: 'l1',
    nest1: {
      nest2: {
        level3: 'l3',
        level2: 'l2',
        level5: 'l5',
        nest3: {
          nest4: {
            level7: 'l7',
            level8: 'l8',
            level6: 'l6',
            nest5: {
              nest5: {
                level9: 'l9',
                level10: 'l10',
                level11: 'l11',
                level12: 'l12',
                nest6: {
                  level13: 'l13'
                }
              }
            }
          }
        }
      }
    }
  }

  const expected = JSON.stringify({
    nest1: {
      nest2: {
        level3: 'l3new',
        level2: 'l2',
        level5: 'l5',
        nest3: {
          nest4: {
            level7: 'l7new',
            level8: 'l8',
            level6: 'l6',
            nest5: {
              level9: 'l9',
              level10: 'l10new',
              level11: 'l11new',
              level12: 'l12'
            }
          }
        }
      }
    }
  })

  it('creates dict with the same order as default dict with cleaned keys', () => {
    const rebuiltDict = JSON.stringify(rebuild(newObj, defaultObj))
    expect(rebuiltDict).to.deep.equal(expected)
  })
})
