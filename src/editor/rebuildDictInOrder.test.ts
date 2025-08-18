import { rebuildDictInOrder } from './rebuildDictInOrder'

describe('rebuildDictInOrder', () => {
  const newDict = {
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
            emptyNest: {},
            nest5: {
              level11: 'l11new',
              level9: 'l9',
              level12: 'l12',
              level10: 'l10new',
              nest6: {
                level13: '',
              },
              nest7: {},
            },
          },
        },
      },
    },
  }

  const defaultDict = {
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
              level9: 'l9',
              level10: 'l10',
              level11: 'l11',
              level12: 'l12',
              nest6: {
                level13: '',
              },
              nest7: {},
            },
          },
        },
      },
    },
  }

  const expectedResult = {
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
              level12: 'l12',
            },
          },
        },
      },
    },
  }

  it('creates dict with the same order as default dict with cleaned keys', () => {
    const rebuiltDict = rebuildDictInOrder(newDict, defaultDict)
    expect(JSON.stringify(rebuiltDict)).toEqual(JSON.stringify(expectedResult))
  })
})
