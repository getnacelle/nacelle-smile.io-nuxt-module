const path = require('path');

module.exports = {
  stories: ['../components/stories/*.stories.[tj]s'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    
    config.resolve.alias = {
      '@': path.dirname(path.resolve(__dirname)),
      '~': path.dirname(path.resolve(__dirname)),
      'vue$': 'vue/dist/vue.esm.js',
    }

    return config;
  },
}
