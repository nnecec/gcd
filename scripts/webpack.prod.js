const webpack = require('webpack')

const common = require('./webpack.commmon')
// plugins
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: './components/index.ts'
  },
  output:{
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  externals: {
    react: 'React',
    antd: 'antd',
    'react-dom': 'ReactDOM'
  },
  target: 'web',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new UglifyJsPlugin(),
  ],
  devtool: 'hidden-source-map',
})