export function getTotalFilledKeys(dict: Record<string, any>) {
  let total = 0;
  for (let [key, value] of Object.entries(dict)) {
    const isObject = typeof value === 'object'
    if (isObject && !isEmpty(value)) total += getTotalFilledKeys(value)
    if (value && !isObject) total++
  }
  return total
}

export function getTotalKeys(dict: Record<string, any>) {
  let total = 0;
  for (let [key, value] of Object.entries(dict)) {
    // total++
    const isObject = typeof value === 'object'
    if (isObject) total += getTotalKeys(value)
    if (value && !isObject) total++
  }
  return total
}

function isEmpty(value: object) {
  return !Object.keys(value).length
}