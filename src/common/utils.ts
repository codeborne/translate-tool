export function getBaseUrl(url: string) {
  return url.substring(0, url.lastIndexOf('/'))
}

export function b64DecodeUnicode(str: string) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
}

export function deepCopy(v: any) {
  return JSON.parse(JSON.stringify(v))
}

export function deepEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  return JSON.stringify(a) == JSON.stringify(b)
}
