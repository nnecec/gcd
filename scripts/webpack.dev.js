const webpack = require('webpack');
const path = require('path')

const common = require('./webpack.commmon')
const sourcePath = path.join(__dirname, '../');
// plugins
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './site/template/app.tsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'site/static/index.html'
    })
  ],
  // devServer: {
  //   contentBase: sourcePath,
  //   hot: true,
  //   inline: true,
  //   historyApiFallback: {
  //     disableDotRule: true
  //   },
  //   stats: 'minimal',
  //   clientLogLevel: 'warning',
  //   port: 3005,
  //   color: true,
  //   progress: true,
  //   open: true
  // },
  devtool: 'cheap-module-eval-source-map',
})