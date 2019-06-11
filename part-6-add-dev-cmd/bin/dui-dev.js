#!/usr/bin/env node
const commander = require('commander')
const { print } = require('dui-console')
const duiConfigs = require('../cfg/dui.js')
const docConfigs = require('../cfg/doc.js')
const DevManager = require('../src/dui-dev/index.js')

commander
  .usage('[options] [templateName ..]')
  .option('-d, --dir <path>', 'set dev path ( default: ./ )')
  .option('-p, --port <port>', 'set dev port ( default: ./package.json/project.devServer.port )')
  .option('-h, --host <host>', 'set dev host ( default: ./package.json/project.devServer.host )')
  .on('--help', () => print.pri(docConfigs.duiDev)())
  .parse(process.argv)

// ----------------
// exec segment 👇
// ----------------

const devManager = new DevManager()

devManager.execute({
  workPath: commander.dir,
  serverPort: commander.port,
  serverHost: commander.host
})
