import { def, isObject } from './utils'
import Dep from './dep'
export default class Observer {
  constructor (value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)
    if (Array.isArray(value)) {

    } else {
      this.walk(value)
    }
  }
  walk (obj) {
    const keys = Object.keys(obj)
    for (let key of keys) {
      defineReactive.call(this, obj, key)
    }
  }
}
function defineReactive (obj, key, val) {
  const self = this
  if (arguments.length === 2) {
    val = obj[key]
  }
  if (typeof val === 'object') {
    new Observer(val)
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`${key}属性被读取`)
      self.dep.depend()
      return val
    },
    set(newVal) {
      if (val === newVal) {
        return
      }
      console.log(`${key}属性被修改`)
      val = newVal
      self.dep.notify()
    }
  })
}
export function observe (data) {
  if (!isObject(data)) {
    return
  }
  let ob
  if (data.hasOwnProperty('__ob__') && data['__ob__'] instanceof Observer) {
    ob = data['__ob__']
  } else {
    ob = new Observer(data)
  }
  return ob
}