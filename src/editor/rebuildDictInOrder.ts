import type {Dict} from '../common/Project'

function isEmpty(value: object) {
  return !Object.keys(value).length
}

export function rebuildDictInOrder(dict: Dict, defaultDict: Dict) {
  const ordered: Dict = {}
  for (let key of Object.keys(defaultDict)) {
    const isObject = typeof dict[key] === 'object'
    if (isObject) {
      if (!isEmpty(dict[key])) ordered[key] = rebuildDictInOrder(dict[key], defaultDict[key])
    } else if (dict[key] && !isEmpty(dict[key])) ordered[key] = dict[key]
    if (ordered[key] && isEmpty(ordered[key])) delete ordered[key]
  }
  return ordered
}
