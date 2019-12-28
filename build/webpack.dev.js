const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { resolve } = require('./utils.js');


module.exports = webpackMerge(baseConfig, {
  // 指定构建环境
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: false,
    open: true,
    host: 'dev.flycua.com',
    disableHostCheck: true,
    port: 3001,
    // port: 443,
    // https: true,
    overlay: true,
    hot: true
    // inline: true
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});