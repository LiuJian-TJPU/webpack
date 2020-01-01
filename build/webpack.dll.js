const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const vendors = [
  'react',
  'react-dom',
  'redux',
  'react-redux'
];

module.exports = {
  mode: 'production',
    devtool: false,
  entry: {
    vendor: vendors,
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: 'Dll.js',
    library: '[name]_[hash]',
  },
    optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,  //使用多进程并行运行来提高构建速度
        terserOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false // 去掉注释
          }
        },
        extractComments: false // 不提取注释，默认true
      }),
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dll', 'manifest.json'),
      name: '[name]_[hash]',
      context: __dirname,
    }),
  ],
};