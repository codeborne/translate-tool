import type {Dict} from './Project'

export function getBaseUrl(url: string) {
  return url.substring(0, url.lastIndexOf('/'))
}

export function decodeBase64Unicode(str: string) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
}

export function encodeBase64Unicode(str: string) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))))
}

export function deepCopy(v: any) {
  return JSON.parse(JSON.stringify(v))
}

export function deepEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  return JSON.stringify(a) == JSON.stringify(b)
}

export function insertKey(dict: Dict, key: string, pos: number) {
  return Object.entries(dict).reduce((newObj: Dict, [k,v], i) => {
    newObj[k] = v
    if (i === pos) newObj[key] = ''
    return newObj
  }, {})
}
