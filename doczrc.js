import * as path from 'path'

const modifyBundlerConfig = config => {
  config.module.rules.push({
    test: /\.(sass|css|scss)$/,
    use: ['style-loader', 'css-loader',
      {
        loader: 'sass-loader'
      }]
  })

  return config
}

export default {
  title: 'GCD',
  typescript: true,
  port: 3005,
  src: './src',
  dest: './docz',
  plugins: [

  ],
  themeConfig: {
    colors: {
      primary: '#0B1749',
      link: '#1C4598',
    }
  },
  modifyBundlerConfig
}
