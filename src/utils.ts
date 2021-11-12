
// Compares two objects, including the values within other nested objects.
// True if identical, false if not.
export function areObjectsEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  let res: boolean = true
  for (let [key] of Object.entries(a)) {
    const isObject = typeof a[key] === 'object'
    if (isObject && !isObjectEmpty(a[key])) res = areObjectsEqual(a[key], b[key])
    if (a[key] !== b[key]) return false
  }
  return res
}

function isObjectEmpty(value: object):boolean {
  return !Object.keys(value).length
}

