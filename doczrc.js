import * as path from 'path'
import { css } from 'docz-plugin-css'

const PUBLIC = path.resolve(__dirname, 'public')
const SRC = path.resolve(__dirname, 'src')

// webpack configuration
const modifyBundlerConfig = config => {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    'hawkeye-arrow': `${SRC}`,
  })
  config.module.rules.push({
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  });
  return config
}

export default {
  typescript: true,
  modifyBundlerConfig,
  port: 3005,
  plugins: [
    // css({
    //   preprocessor: 'postcss',
    //   cssmodules: true,
    //   loaderOpts: {
    //     // javascriptEnabled: true
    //   }
    // })
  ]
}