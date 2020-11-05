const path = require('path')
const { readdirSync } = require('fs')

module.exports = function () {
  const filename = 'nacelle-smile-plugin.js'
  const options = {
    ...this.options.nacelle,
  }

  // Copy components
  const componentsDir = path.resolve(__dirname, 'components')

  for (const file of readdirSync(componentsDir)) {
    this.addTemplate({
      src: path.resolve(__dirname, './components', file),
      fileName: path.join('nacelle', 'integrations', file),
    })
  }

  // Add plugin to nuxt
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: filename,
    options: {
      key: options.smile && options.smile.key,
      secret: options.smile && options.smile.secret,
      spaceId: options.spaceId,
    },
    ssr: false,
  })
}

module.exports.meta = require('../package.json')
