const fse = require('fs-extra')
const { resolve } = require('path')
const vueAppDevServer = require('./vue-app/index.js')
const { pathf } = require('../utils/string.js')
const { printErrorAndExit } = require('../utils/message.js')

module.exports = class Manager {
  createVueAppServer() {
    vueAppDevServer(this.opts, this.pkg)
  }

  execute(opts = {}) {
    this.workPath = pathf(opts.workPath || '{{cwd}}')
    this.serverPort = opts.serverPort
    this.serverHost = opts.serverHost
    this.pkgPath = resolve(this.workPath, 'package.json')

    if (!fse.pathExistsSync(this.workPath)) {
      printErrorAndExit(`work path is not exist: ${this.workPath}`)
    }

    if (!fse.pathExistsSync(this.pkgPath)) {
      printErrorAndExit(`package.json is not exist on the work path: ${this.pkgPath}`)
    }

    this.pkg = fse.readJsonSync(this.pkgPath)
    this.duiConfigs = this.pkg && this.pkg.duiConfigs

    if (!this.duiConfigs) {
      printErrorAndExit(`no duiConfigs field in package.json: ${this.pkgPath}`)
    }

    this.opts = {
      workPath: this.workPath,
      type: this.duiConfigs.type,
      name: this.duiConfigs.name || 'dui project',
      title: this.duiConfigs.title || 'dui project',
      devServer: this.duiConfigs.devServer || {}
    }

    if (this.serverHost || !this.opts.devServer.host) {
      this.opts.devServer.host = this.serverHost
    }

    if (this.serverPort || !this.opts.devServer.port) {
      this.opts.devServer.port = this.serverPort
    }

    switch(this.duiConfigs.type) {
      case 'vue-app':
        this.createVueAppServer()
        break
      default:
        printErrorAndExit(`duiConfigs.type error in package.json: ${this.pkgPath}`)
        break
    }
  }
}
