const fse = require('fs-extra')
const { pathf } = require('../utils/string.js')
const {
  printErrorAndExit,
  printWarn,
  printSuccess,
} = require('../utils/message.js')

function copyFile(inputPath, outputPath) {
  const inputFilePath = inputPath
  let outputFilePath = outputPath

  if (!fse.pathExistsSync(inputFilePath)) {
    printErrorAndExit(`source file is not exists: ${inputFilePath}`)
  }

  if (fse.pathExistsSync(outputFilePath)) {
    printWarn(`target file is already exists: ${outputFilePath}`)
    let fileFlag = 0
    let newFilePath = `${outputFilePath}-${fileFlag}`
    while (fse.pathExistsSync(newFilePath)) {
      fileFlag += 1
      newFilePath = `${outputFilePath}-${fileFlag}`
    }
    outputFilePath = newFilePath
  }

  fse.copySync(inputFilePath, outputFilePath)
  printSuccess(`${inputFilePath} → ${outputFilePath}`)
}

module.exports = (template, workPath = '') => {
  let tasks = template.tasks
  if (!Array.isArray(template.tasks)) {
    tasks = [template.tasks]
  }
  tasks.forEach(task => copyFile(
    pathf(task.input),
    pathf(task.output, { cwd: workPath })
  ))
}
