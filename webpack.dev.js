const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    hot: true
  },
  module: {
    rules: [
      { test: /\.css(\?|$)/, use: ['style-loader', "css-loader"] },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map', // Remove this line if you prefer inline source maps
      moduleFilenameTemplate: path.relative('dist', '[resourcePath]') // Point sourcemap entries to the original file locations on disk
    })
  ]
})