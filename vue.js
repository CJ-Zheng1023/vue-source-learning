import { observe } from './observer'
import { compile } from './compiler'
import Watcher from './watcher'
import { noop } from './utils'
class Vue {
  constructor (options) {
    if (!options) {
      return
    }
    this.data = options.data || {}
    this.template = options.template
    this.el = options.el
    this._proxy()
    this._init()
  }
  _proxy () {
    const data = this.data
    const keys = Object.keys(data)
    for (let key of keys) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return this.data[key]
        },
        set(newVal) {
          this.data[key] = newVal
        }
      })
    }
  }
  _init () {
    initData(this)
    initCompile(this)
  }
}
function initData (vm) {
  observe(vm.data)
}
function initCompile (vm) {
  new Watcher(vm, compile, noop)
}
export default Vue