export function getFilledDictCount(dict: Record<string, any>) {
  let total = 0;
  for (let [key, value] of Object.entries(dict)) {
    const isObject = typeof value === 'object'
    if (isObject && !isEmpty(value)) total += getFilledDictCount(value)
    if (value && !isObject) total++
  }
  return total
}

export function getTotalDictCount(dict: Record<string, any>) {
  let total = 0;
  for (let [key, value] of Object.entries(dict)) {
    total++
    const isObject = typeof value === 'object'
    if (isObject) value = getTotalDictCount(value)
    if (value || !isObject && isEmpty(value)) total++
  }
  return total
}

function isEmpty(value: object) {
  return !Object.keys(value).length
}