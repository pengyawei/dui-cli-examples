const generator = require('./generator.js')

module.exports = class Manager {
  constructor(options = {}) {
    this.templates = options.templates || []
  }

  execute(options = {}) {
    const { workPath } = options
    generator(this.templates[0], workPath)
  }
}
