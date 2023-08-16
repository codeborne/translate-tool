import type {Dict} from '../common/Project'

export function totalKeys(dict: Dict) {
  let total = 0
  for (let value of Object.values(dict)) {
    if (typeof value === 'object') total += totalKeys(value as Dict)
    else if (value) total++
  }
  return total
}

export function countChangedValues(modified: Dict, original: Dict) {
  let changes = 0
  for (let [key, value] of Object.entries(modified)) {
    if (typeof value === 'object') changes += original[key] ? countChangedValues(value as Dict, original[key] as Dict) : totalKeys(value)
    else if (value !== original[key]) changes++
  }
  return changes
}
