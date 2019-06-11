const path = require('path')
const os = require('os')

const urd = os.homedir()
const cwd = process.cwd()
const prd = path.resolve(__dirname, '../../')

// templateReplace('xxxxxx{{haha}}xxxxx', { haha: 3 })
// output: 'xxxxxx3xxxxx'
function strf(str, data = {}) {
  if (str) {
    return str.replace(
      /\{\{(\w+)\}\}/g,
      (match, key) => (data[key] || key)
    )
  }
  return ''
}

// pathResolve('{{urd}}/to/path', { urd: '/User/yamcer' })
// output: '/User/yamcer/to/path'
function pathf(str, data = {}) {
  if (str) {
    const props = { ...data }
    if (!props.cwd) {
      props.cwd = cwd
    }
    if (!props.prd) {
      props.prd = prd
    }
    if (!props.urd) {
      props.urd = urd
    }
    return path.resolve(strf(str, props))
  }
  return ''
}

module.exports = {
  strf,
  pathf,
}
