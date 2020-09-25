import { parsePath } from './utils'
export default class Watcher{
  constructor (vm, expOrFn, cb){
    this.vm = vm
    this.cb = cb
    this.initialized = false
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.value = this.get()
    this.initialized = true
  }
  get () {
    if (!this.initialized) {
      window.target = this
    }
    const vm = this.vm
    const value = this.getter.call(vm, vm)
    window.target = undefined
    return value
  }
  update () {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}