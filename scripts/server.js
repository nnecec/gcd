const webpack = require('webpack')
const serve = require('webpack-serve')
const config = require('./webpack.dev.js')


serve({}, {
  config,
  open: true,
  clipboard: false,
  logLevel: 'debug',
  port: 3005,
}).then(result => {

})