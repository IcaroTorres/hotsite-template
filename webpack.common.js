const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    stats: { modules: false },
    context: __dirname,
    resolve: {
      extensions: ['*', '.js', '.json']
    },
    entry: {
      hotsite: './src/index.js',
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      library: '[name]_[hash]'
    },
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|jpg|jpeg|gif|svg)$/,
          use: [{ loader: 'url-loader', options: { limit: 250000, name: '[name].[hash:10].[ext]', publicPath: '/' }}]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.html$/,
          use: [{
            loader: "html-loader",
            options: {
              ignoreCustomFragments: [/\{\{.*?}}/],
              root: path.resolve(__dirname, 'src'),
              attrs: ['img:src']
            },
          }]
        }
      ]
    }, 
    optimization: {
      minimizer: [
          new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true
          }),
          new OptimizeCSSAssetsPlugin({})
      ]
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all'
    //   }
    // },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Credenciamento de Chefes de Núcleo Regional da Educação',
        template: 'index.html'
      })
    ]
}