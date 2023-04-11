import type {Dict} from '../common/Project'

function isEmpty(value: object) {
  return !Object.keys(value).length
}

export function rebuildDictInOrder(dict: Dict, defaultDict: Dict) {
  const result: Dict = {}
  for (let key of Object.keys(defaultDict)) {
    const isObject = typeof dict[key] === 'object'
    if (isObject) {
      if (!isEmpty(dict[key])) result[key] = rebuildDictInOrder(dict[key], defaultDict[key])
    } else if (dict[key] && !isEmpty(dict[key])) result[key] = dict[key]
    if (result[key] && isEmpty(result[key])) delete result[key]
  }
  return result
}
