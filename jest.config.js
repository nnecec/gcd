module.exports = {
  verbose: true,

  setupFiles: [
    './tests/setup.js',
  ],

  // 如果没有指定后缀名 jest 会从这个列表里查找
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],

  "testMatch": [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],

  // 
  modulePathIgnorePatterns: [
    '/scripts/',
  ],

  // 忽略的测试路径
  testPathIgnorePatterns: [
    '/node_modules/',
    'node',
  ],


  transform: {
    '\\.tsx?$': 'ts-jest',
  },
  // 忽略的转换路径
  transformIgnorePatterns: [
    '/dist/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
  ],

  // snapshot 序列化模块
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],

  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json'
    },
  },

  testURL: 'http://localhost',
}