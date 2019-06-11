#!/usr/bin/env node
const commander = require('commander')
const { print } = require('dui-console')
const packageInfo = require('../package.json')
const docConfigs = require('../cfg/doc.js')

commander
  .version(packageInfo.version)
  .usage('<command> [options]')
  .command('init', 'generate dui project')
  .command('config', 'generate config files')
  .command('dev', 'run dui project')
  .command('lint', 'lint code with eslint rules')
  .on('--help', () => print.pri(docConfigs.dui)())
  .parse(process.argv)

// ----------------
// exec segment 👇
// ----------------

// nothing should to do
