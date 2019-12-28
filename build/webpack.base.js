const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { resolve, isDev } = require('./utils.js');

console.log(process.env.NODE_ENV)
console.log(isDev)

module.exports = {

  entry: resolve('../src/main.js'),    // 入口文件

  // output: {
  //   filename: 'js/[name][hash:8].js',      // 打包后的文件名称
  // },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            name: '[name].[hash:4].[ext]',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 从右向左解析原则
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } }
        ] // 从右向左解析原则
        // use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] // 从右向左解析原则
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.API': JSON.stringify(process.env.API)
    })
  ]
}