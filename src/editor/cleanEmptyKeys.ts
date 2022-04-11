import {deepCopy} from '../common/utils'
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
  let rebuiltDict = deepCopy(defaultDict)
  for (let [key] of Object.entries(rebuiltDict)) {
    const isObject = typeof dict[key] === 'object'
    if (isObject) rebuiltDict[key] = rebuild(dict[key], rebuiltDict[key])
    if (!dict[key] || isObject && isEmpty(dict[key])) delete rebuiltDict[key]
    else rebuiltDict[key] = dict[key]
  }
  return rebuiltDict
}