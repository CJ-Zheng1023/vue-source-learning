export function def (obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val,
    writable: true,
    configurable: true
  })
}
const bailRE = /[^\w.$]/
export function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let segment of segments) {
      if (!obj) {
        return
      }
      obj = obj[segment]
    }
    return obj
  }
}
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
export function noop (a, b, c, d) {}