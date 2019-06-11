#!/usr/bin/env node
const commander = require('commander')
const { print } = require('dui-console')
const duiConfigs = require('../cfg/dui.js')
const docConfigs = require('../cfg/doc.js')
const LintManager = require('../src/dui-lint/index.js')

commander
  .usage('[options]')
  .option('-f, --fix', 'lint code with autofix')
  .option('-d, --dir <path>', 'set work directory ( default: ./ )')
  .option('-c, --conf <path>', 'set eslint config file ( default: ./ )')
  .option('-o, --output <path>', 'output eslint report file ( default: ./ )')
  .on('--help', () => print.pri(docConfigs.duiLint)())
  .parse(process.argv)

// ----------------
// exec segment 👇
// ----------------

const lintManager = new LintManager({
  defaultLintrcPath: duiConfigs.lint.defaultLintrcPath,
})

lintManager.execute({
  isAutoFix: commander.fix,
  workPath: commander.dir,
  confPath: commander.conf,
  logsPath: commander.output,
})
