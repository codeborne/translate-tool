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