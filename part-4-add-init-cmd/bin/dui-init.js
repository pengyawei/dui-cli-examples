#!/usr/bin/env node
const commander = require('commander')
const { print } = require('dui-console')
const duiConfigs = require('../cfg/dui.js')
const docConfigs = require('../cfg/doc.js')
const InitManager = require('../src/dui-init/index.js')

commander
  .usage('[options] [templateName ..]')
  .option('-d, --dir <path>', 'set output path ( default: ./ )')
  .on('--help', () => print.pri(docConfigs.duiInit)())
  .parse(process.argv)

// ----------------
// exec segment 👇
// ----------------

const initManager = new InitManager({
  templates: duiConfigs.init.templates,
})

initManager.execute({
  workPath: commander.dir,
})
