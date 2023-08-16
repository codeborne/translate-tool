import type {Dict} from '../common/Project'

export function totalKeys(dict: Dict) {
  let total = 0
  for (let value of Object.values(dict)) {
    const isObject = typeof value === 'object'
    if (isObject) total += totalKeys(value as Dict)
    if (value && !isObject) total++
  }
  return total
}

export function countChangedValues(modified: Dict, original: Dict) {
  let changes = 0
  for (let [key, value] of Object.entries(modified)) {
    const isObject = typeof value === 'object'
    if (isObject) changes += original[key] ? countChangedValues(value as Dict, original[key] as Dict) : totalKeys(value)
    if (!isObject && value !== original[key]) changes++
  }
  return changes
}
