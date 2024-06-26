const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const fs = require('fs')
const path = require('path')
const { alias } = require('./alias')

const node_modules = path.resolve(__dirname, '../..', 'node_modules')
const packages = path.resolve(__dirname, '../..', 'packages')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  config.context = path.resolve(__dirname, '../..')

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: /(packages|examples)\/.+/,
    exclude: /node_modules/,
    use: require.resolve('babel-loader'),
  })

  Object.assign(config.resolve.alias, {
    'react': path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
    '@expo/vector-icons': path.resolve(node_modules, '@expo/vector-icons'),
    'zeego$': path.resolve(__dirname, '../../packages/zeego/src'),
  })

  return config
}
