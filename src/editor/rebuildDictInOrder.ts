import type {Dict} from '../common/Project'

function isEmpty(value: object) {
  return !Object.keys(value).length
}

export function rebuildDictInOrder(dict: Dict, defaultDict: Dict) {
  const result: Dict = {}
  for (let key of Object.keys(defaultDict)) {
    const value = dict[key]
    if (typeof value === 'object') result[key] = rebuildDictInOrder(value, defaultDict[key])
    else if (value || dict === defaultDict) result[key] = value
  }
  return isEmpty(result) ? undefined : result
}
