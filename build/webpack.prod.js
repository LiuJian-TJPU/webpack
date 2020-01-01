
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { resolve } = require('./utils.js');


module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name][contenthash:8].js'
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
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,   // 大于30k会被webpack进行拆包
      minChunks: 1,     // 被引用次数大于等于这个次数进行拆分
      maxAsyncRequests: 5,  // 最大的按需加载（异步）请求次数
      maxInitialRequests: 5,
      automaticNameDelimiter: '~', // 打包分隔符
      name: true,
      cacheGroups: {
        // 拆分基础插件
        basic: {
          priority: 3,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|redux|react-redux|redux-saga|axios)[\\/]/
        },
        // 默认的配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          priority: -10
        },
        // 默认的配置
        default: {
          minChunks: 2, // 引用超过两次的模块 -> default
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name][contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html'),
      favicon: resolve('public/favicon.ico'),
      minify: {
        collapseWhitespace: true//html压缩
      }
    })
    //,new BundleAnalyzerPlugin()//打包分析
  ]
})