module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/lib/$1',
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/example/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: false,
}
