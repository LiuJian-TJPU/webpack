const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base')

module.exports = webpackMerge(baseConfig, {
  // 指定构建环境
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name]~[hash].js',
    chunkFilename: '[name]~[hash].js'
  },

  devServer: {
    contentBase: false,
    open: true,
    host: 'localhost',
    disableHostCheck: true,
    port: 3001,
    // port: 443,
    // https: true,
    overlay: true,
    hot: false
    // inline: true
  }
});