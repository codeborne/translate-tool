
// Compares two objects, including the values within other nested objects.
// True if identical, false if not.
function isObjectEmpty(value: object):boolean {
  return !Object.keys(value).length
}

export function areObjectsEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  if (a === b) return true
  if (a.length == 0 && b.length == 0) return true
  if (typeof a != 'object' || typeof b != 'object' || a == null || b == null) return false
  let keysA = Object.keys(a), keysB = Object.keys(b)
  if (keysA.length != keysB.length) return false
  for (let key of keysA) {
    if (!keysB.includes(key)) return false
    if (!areObjectsEqual(a[key], b[key])) return false
  }
  return true;
}

