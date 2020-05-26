const path = require('path')
const { readdirSync } = require('fs')

module.exports = function (moduleOptions) {
  const filename = 'nacelle-smile-plugin.js'
  const options = {
    ...this.options.nacelle,
    smile: {
      key: moduleOptions.key || '',
      secret: moduleOptions.secret || ''
    }
  }

  // Copy components
  const componentsDir = path.resolve(__dirname, 'components')

  for (const file of readdirSync(componentsDir)) {
    this.addTemplate({
      src: path.resolve(__dirname, './components', file),
      fileName: path.join('nacelle', 'integrations', file)
    })
  }

  // Add plugin to nuxt
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: filename,
    options: {
      settings: options
    }
  })
}

module.exports.meta = require('../package.json')
