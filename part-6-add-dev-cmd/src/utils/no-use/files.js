
const networkUtil = require('./network.js')
const stringUtil = require('./string.js')
const errorUtil = require('./error.js')

// download('https://xxxx.zip', { extract: true }, () => {})
exports.copy = (url, options, callback => {
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
