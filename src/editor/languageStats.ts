import type {Dict} from '../common/Project'

export function totalKeys(dict: Dict) {
  let total = 0;
  for (let value of Object.values(dict)) {
    // total++
    const isObject = typeof value === 'object'
    if (isObject) total += totalKeys(value as Dict)
    if (value && !isObject) total++
  }
  return total
}
