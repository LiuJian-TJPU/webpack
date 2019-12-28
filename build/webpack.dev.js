const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:'development', // 开发模式
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件

    output: {
        filename: 'js/[name][hash:8].js',      // 打包后的文件名称
    },

     module:{
      rules:[
        {
          test:/\.css$/,
          // use:['style-loader','css-loader', 'postcss-loader'] // 从右向左解析原则
          use:[MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader'] // 从右向左解析原则
        },
        {
          test:/\.less$/,
          // use:['style-loader','css-loader','postcss-loader','less-loader'] // 从右向左解析原则
          use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader'] // 从右向左解析原则
        }
      ]
    },

    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: "js/css/[name].[hash:8].css",
      }),
      new CleanWebpackPlugin()
    ]
}