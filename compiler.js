import { parsePath } from './utils'
//todo
export function compile (vm) {
  const data = vm.data
  const template = vm.template
  const el = vm.el
  let html = template
  const reg = new RegExp('{{[a-zA-Z0-9.]+}}', 'gi')
  const matches = template.match(reg)
  for (let m of matches) {
    let path = m.replace(/[{}]/gi, '')
    let value = parsePath(path)(data)
    html = html.replace(m, value)
  }
  render(document.querySelector(el), html)
  return html
}
function render (target, html) {
  target.innerHTML = html
}