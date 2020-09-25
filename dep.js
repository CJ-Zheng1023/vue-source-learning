export default class Dep {
  constructor () {
    this.subs  = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  removeSub (sub) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub)
      if (index > -1) {
        this.subs.splice(index, 1)
      }
    }
  }
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  notify () {
    for (let sub of this.subs) {
      sub.update()
    }
  }
}