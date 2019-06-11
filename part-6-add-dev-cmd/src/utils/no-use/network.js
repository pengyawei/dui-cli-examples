
const download = require('download')
const ora = require('ora')
const errorUtil = require('./error.js')

// download('https://xxxx.zip', { extract: true }, () => {})
exports.download = (url, options, callback => {
  const spinner = ora(`downloading: ${url}`).start()
  download(url, options)
    .then(data => {
      spinner.success()
      callback(data)
    })
    .catch(err => {
      spinner.fail()
      errorUtil.exitWithErr(err)
    })
}
