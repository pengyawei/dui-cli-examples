const inquirer = require('inquirer')
const generator = require('./generator.js')
const { printErrorAndExit } = require('../utils/message.js')

module.exports = class Manager {
  constructor(options = {}) {
    this.templates = options.templates || []
    this.selectedTemplateNames = options.selectedTemplateNames || []
  }

  createQuestions() {
    const choices = this.templates.map(item => ({
      name: item.name,
      value: item,
    }))
    if (this.selectedTemplateNames.length > 0) {
      for (let i = 0; i < choices.length; i++) {
        for (let j = 0; j < this.selectedTemplateNames.length; j++) {
          if (choices[i].name === this.selectedTemplateNames[j]) {
            choices[i].checked = true
            break
          }
        }
      }
    }
    return [
      {
        type: 'checkbox',
        name: 'templates',
        message: 'select config files',
        choices,
        validate: answer => {
          if (answer.length > 0) {
            return true
          }
          return [
            'You must choose at least one topping',
            '<Ctrl+C> exit, <Space> click, <a> choose all, <i> reverse all',
          ].join('\n   ')
        },
      },
    ]
  }

  execute(options) {
    const { skipChoose, workPath } = options
    if (skipChoose) {
      const templates = []
      if (this.selectedTemplateNames.length > 0) {
        for (let i = 0; i < this.templates.length; i++) {
          for (let j = 0; j < this.selectedTemplateNames.length; j++) {
            if (this.templates[i].name === this.selectedTemplateNames[j]) {
              templates.push(this.templates[i])
              break
            }
          }
        }
      }
      if (templates.length > 0) {
        try {
          templates.forEach(template => {
            generator(template, workPath)
          })
        } catch (e) {
          printErrorAndExit(e)
        }
      }
      return null
    }
    inquirer.prompt(this.createQuestions()).then(result => {
      result.templates.forEach(template => {
        generator(template, workPath)
      })
    }).catch(printErrorAndExit)
    return null
  }
}
