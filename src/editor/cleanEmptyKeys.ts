import type {Dict} from '../common/Project'

function isEmpty(value: object) {
  return !Object.keys(value).length
}

export function cleanEmptyKeys(dict: Record<string, any>) {
  for (let [key, value] of Object.entries(dict)) {
    const isObject = typeof value === 'object'
    if (isObject) value = cleanEmptyKeys(value)
    if (!value || isObject && isEmpty(value)) delete dict[key]
  }
  return dict
}

export function rebuild(dict: Dict, defaultDict: Dict) {
  for (let [key] of Object.entries(defaultDict)) {
    const isObject = typeof dict[key] === 'object'
    if (isObject) dict[key] = rebuild(dict[key], defaultDict[key])
    if (!dict[key] || isObject && isEmpty(dict[key])) {
      delete dict[key]
    }
    dict[key] = defaultDict[key]
  }
  return dict
}