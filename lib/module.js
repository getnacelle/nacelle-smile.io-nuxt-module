const path = require('path')
const { readdirSync } = require('fs')

module.exports = function (moduleOptions) {
  const filename = 'nacelle-smile-plugin.js'
  const options = {
    ...this.options.nacelle,
    ...moduleOptions
  }

  // Add Smile script
  this.options.head.script.push({
    src: '//cdn.sweettooth.io/assets/storefront.js',
    mode: 'client',
    defer: true,
    async: false
  })

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
    options
  })
}

module.exports.meta = require('../package.json')
