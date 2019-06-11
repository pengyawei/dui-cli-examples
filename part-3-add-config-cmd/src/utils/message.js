const { print } = require('dui-console')

function printError(msg) {
  if (msg) {
    print.err('[ERROR]   ').err((msg && msg.message) || msg)()
  }
}

function printWarn(msg) {
  if (msg) {
    print.war('[WARN]    ').war((msg && msg.message) || msg)()
  }
}

function printSuccess(msg) {
  if (msg) {
    print.suc('[SUCCESS] ').suc((msg && msg.message) || msg)()
  }
}

function printErrorAndExit(msg) {
  if (msg) {
    printError(msg)
    process.exit(-1)
  }
}

module.exports = {
  printWarn,
  printError,
  printSuccess,
  printErrorAndExit
}
