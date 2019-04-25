import typescript from 'typescript'
import rollupTypescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import less from 'rollup-plugin-less'
import postcss from 'rollup-plugin-postcss'
import buble from 'rollup-plugin-buble'
import path from 'path'

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  resolve({
    preferBuiltins: true,
    browser: true
  }),

  rollupTypescript({
    typescript,
    abortOnError: false,
    tsconfig: path.resolve(__dirname, './tsconfig.commonjs.json')
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react-dom/index.js': [
        'render',
      ],
      'node_modules/react/index.js': [
        'Children',
        'Component',
        'PropTypes',
        'createElement',
      ],
    },
  }),
  less(),
  postcss({ extract: true }),
  buble({
    // transforms: { dangerousTaggedTemplateString: true } // fix styled-components error
  }),
  // uglify(),
]

const dependencies = Object.keys(require('../package.json').dependencies)

export default {
  input: 'src/index.ts',
  output: [{
    file: 'dist/index.js',
    format: 'commonjs',
    name: 'gcd',
    sourceMap: false,
    globals: {
      react: 'React',
      antd: 'antd'
    },
  }, {
    file: 'dist/index.esm.js',
    format: 'esm',
    name: 'gcd',
    sourceMap: false,
    globals: {
      react: 'React'
    },
  },],
  plugins,

  external: dependencies,
}