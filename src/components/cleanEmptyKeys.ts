export function cleanEmptyKeys(dict: Record<string, any>) {
  for (let [key] of Object.entries(dict)) {
    if (typeof dict[key] === 'object') {
      cleanEmptyKeys(dict[key])
    } else if (dict[key].length == 0 || dict[key] === {}) {
      delete dict[key]
    }
  }
  return dict
}
