const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: '[name]/[name]~[contenthash:8].js',
    chunkFilename: 'common/[name]~[contenthash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name]~[contenthash:8].css',
      chunkFilename: 'common/[name]~[contenthash:8].css'
    }),
    // new BundleAnalyzerPlugin()//打包分析
  ]
})