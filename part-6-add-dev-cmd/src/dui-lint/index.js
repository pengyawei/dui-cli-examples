const fse = require('fs-extra')
const { CLIEngine: Eslinter } = require('eslint')
const { resolve } = require('path')
const { print } = require('dui-console')
const { pathf } = require('../utils/string.js')
const {
  printErrorAndExit,
  printError,
  printWarn,
  printSuccess,
} = require('../utils/message.js')

module.exports = class Manager {
  constructor(options) {
    this.defaultLintrcPath = options.defaultLintrcPath || ''
    this.eslinter = {}
  }

  createEslintConfig() {
    return {
      fix: this.isAutoFix,
      useEslintrc: true,
      extensions: [
        '.js', '.jsx', '.vue', '.wpy',
      ],
      ignorePattern: [
        'docs', 'logs', 'demo', 'test',
        'dist', 'public', 'build', 'cache',
        'node_modules', 'bin',
      ],
    }
  }

  handleLogs() {
    if (this.logsPath) {
      if (fse.pathExistsSync(`${this.logsPath}.html`)) {
        printWarn(`target file is already exists: ${this.logsPath}`)
        let fileFlag = 0
        let newFilePath = `${this.logsPath}-${fileFlag}`
        while (fse.pathExistsSync(newFilePath)) {
          fileFlag += 1
          newFilePath = `${this.logsPath}-${fileFlag}`
        }
        this.logsPath = newFilePath
      }
      const logs = this.eslinter.getFormatter('html')(this.report.results)
      fse.outputFileSync(`${this.logsPath}.html`, logs)
      if (this.report.errorCount > 0) {
        printError('there are some problems in the fix process')
      }
      printSuccess(`report results content in file: ${this.logsPath}`)
    } else {
      const logs = this.stylishFormatter(this.report.results)
      if (logs) {
        print(logs)
      }
    }
  }

  autoFix() {
    if (this.isAutoFix) {
      Eslinter.outputFixes(this.report)
      if (this.report.errorCount > 0) {
        print()
        process.exit(-1)
      } else {
        printSuccess('Maybe Some issues have been fixed, remember to use \'git status\' to check')
      }
    } else if (this.report.errorCount > 0) {
      process.exit(-1)
    } else {
      printSuccess('Your code access eslinter')
    }
  }

  execute(options = {}) {
    this.isAutoFix = options.isAutoFix
    this.workPath = pathf(options.workPath || '{{cwd}}')
    this.logsPath = pathf(options.logsPath)
    this.confPath = pathf(options.confPath || this.defaultLintrcPath)

    if (!fse.pathExistsSync(this.workPath)) {
      printErrorAndExit(`work path is not exist: ${this.workPath}`)
    }

    if (!fse.pathExistsSync(this.confPath)) {
      printErrorAndExit(`config file is not exist: ${this.confPath}`)
    }

    this.eslinter = new Eslinter(this.createEslintConfig())
    this.stylishFormatter = this.eslinter.getFormatter('stylish')
    this.report = this.eslinter.executeOnFiles([this.workPath])

    this.handleLogs()
    this.autoFix()
  }
}
