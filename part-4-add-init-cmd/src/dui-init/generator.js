const fse = require('fs-extra')
const { pathf } = require('../utils/string.js')
const duiConfigs = require('../../cfg/dui.js')
const ConfigManager = require('../dui-config/index.js')
const {
  printErrorAndExit,
  printWarn,
  printSuccess,
} = require('../utils/message.js')

function copyConfigs(outputDirPath) {
  const configManager = new ConfigManager({
    templates: duiConfigs.config.templates,
    selectedTemplateNames: [
      'git-ignore',
      'eslintrc-vue'
    ],
  })
  configManager.execute({
    skipChoose: true,
    workPath: outputDirPath,
  })
}

function copyDir(inputPath, outputPath) {
  const inputDirPath = inputPath
  let outputDirPath = outputPath

  if (!fse.pathExistsSync(inputDirPath)) {
    printErrorAndExit(`source dir is not exists: ${inputDirPath}`)
  }

  if (fse.pathExistsSync(outputDirPath)) {
    printWarn(`target dir is already exists: ${outputDirPath}`)
    let dirFlag = 0
    let newDirPath = `${outputDirPath}-${dirFlag}`
    while (fse.pathExistsSync(newDirPath)) {
      dirFlag += 1
      newDirPath = `${outputDirPath}-${dirFlag}`
    }
    outputDirPath = newDirPath
  }

  fse.ensureDirSync(outputDirPath)
  fse.copySync(inputDirPath, outputDirPath)
  printSuccess(`${inputDirPath} → ${outputDirPath}`)
  copyConfigs(outputDirPath)
}

module.exports = (template, workPath = '') => {
  let tasks = template.tasks
  if (!Array.isArray(template.tasks)) {
    tasks = [template.tasks]
  }
  tasks.forEach(task => copyDir(
    pathf(task.input),
    pathf(task.output, { cwd: workPath })
  ))
}
