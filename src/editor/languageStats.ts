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

export function totalDifferentValues(origDict: Dict, modifiedDict: Dict) {
  let changes = 0
  for (let [key, value] of Object.entries(origDict)) {
    const isObject = typeof value === 'object'
    if (isObject) changes += totalDifferentValues(value as Dict, modifiedDict[key] as Dict)
    if (!isObject && value !== modifiedDict[key]) changes++
  }
  return changes
}
