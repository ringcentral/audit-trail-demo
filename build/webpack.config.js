require('dotenv').config()
const AntdDayjsWebpackPlugin = require('@electerm/antd-dayjs-webpack-plugin')
const { identity } = require('lodash')
const path = require('path')
const {
  extractTextPlugin1,
  stylusSettingPlugin
} = require('./plugins')
const devServer = require('./dev-server')
const rules = require('./rules')

const config = {
  mode: 'development',
  entry: {
    app: './src/client/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../deploy/dist/static'),
    filename: 'js/[name].bundle.js',
    publicPath: '/',
    chunkFilename: 'js/[name].bundle.js',
    libraryTarget: 'var',
    library: 'Rc'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json']
  },
  module: {
    rules
  },
  devtool: 'source-map',
  plugins: [
    stylusSettingPlugin,
    extractTextPlugin1,
    new AntdDayjsWebpackPlugin()
  ].filter(identity),
  devServer
}

module.exports = config
