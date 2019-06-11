#!/usr/bin/env node
const commander = require('commander')
const { print } = require('dui-console')
const duiConfigs = require('../cfg/dui.js')
const docConfigs = require('../cfg/doc.js')
const ConfigManager = require('../src/dui-config/index.js')

commander
  .usage('[options] [templateName ..]')
  .option('-d, --dir <path>', 'set output path ( default: ./ )')
  .option('-s, --skip-choose', 'no questions')
  .on('--help', () => print.pri(docConfigs.duiConfig)())
  .parse(process.argv)

// ----------------
// exec segment 👇
// ----------------

const configManager = new ConfigManager({
  templates: duiConfigs.config.templates,
  selectedTemplateNames: commander.args,
})

configManager.execute({
  skipChoose: commander.skipChoose,
  workPath: commander.dir,
})
