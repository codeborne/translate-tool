import { countChangedValues, totalKeys } from './languageStats'

describe('totalKeys', () => {
  it('counts total keys recursively', () => {
    const dict = totalKeys({ t1: '1', t2: '2', t: { t3: '3', t4: '4', t: { t5: '5', t6: '6' } } })
    expect(dict).toEqual(6)
    expect(totalKeys({})).toEqual(0)
    expect(totalKeys({ hello: 'world', nested: { hello: 'Another World' } })).toEqual(2)
  })
})

describe('totalDifferentValues', () => {
  it('counts total different key values recursively', () => {
    const original = { t1: '1', t2: '2', t: { t3: '3', t4: '4', t: { t5: 'old value', t6: 'another old value' } } }
    const modified = { t1: '1', t2: '2', t: { t3: '3', t4: '4', t: { t5: '', t6: 'new value', t7: 'added' } } }
    expect(countChangedValues(modified, original)).toEqual(3)
  })

  it('counts total different key values recursively with different depth', () => {
    const original = { a: '1' }
    const modified = { a: '1', b: '2', c: { d: '3', z: '4' } }
    expect(countChangedValues(modified, original)).toEqual(3)
  })
})
