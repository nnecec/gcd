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
  })
  config.module.rules.push({
    test: /\.less$/,
    use: ["style-loader", "css-loader",
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }]
  })

  return config
}

export default {
  title: 'hawkeye-arrow',
  typescript: true,
  modifyBundlerConfig,
  port: 3005,
  plugins: [

  ],
  themeConfig: {
    colors: {
      primary: '#0B1749',
      link: '#1C4598',
    }
  },
}
