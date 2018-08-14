const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, '../');
const outPath = path.join(__dirname, '../dist');

// plugins
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const WebpackBar = require('webpackbar')

module.exports = {
  context: sourcePath,
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['module', 'browser', 'main'],
    alias: {
      // components: path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // static
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new WebpackBar({
      name: '📦  Site',
      minimal: false,
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  },
};