const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  resolve,
  isDev,
  getEntry
} = require('./utils.js');

console.log(process.env.NODE_ENV)
console.log(isDev)

const {
  entryJs,
  entryHtml
} = getEntry();

let newHtmls = [];

for (const key in entryHtml) {
  if (entryHtml.hasOwnProperty(key)) {
    const path = entryHtml[key];
    newHtmls.push(
      new HtmlWebpackPlugin({
        filename: key + '.html',
        template: path,
        favicon: resolve('public/favicon.ico'),
        chunks: ['basic', 'vendors', key],
        minify: {
          collapseWhitespace: !isDev //html压缩
        }
      })
    )
  }
}

module.exports = {

  entry: entryJs, // 入口文件

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
      'pages': resolve('src/pages'),
      'components': resolve('src/components'),
      'constants': resolve('src/constants'),
      'styles': resolve('src/styles'),
      'utils': resolve('src/utils'),
      'selectors': resolve('src/selectors'),
      'store': resolve('src/redux/store'),
      'assets': resolve('src/assets'),
      'actions': resolve('src/redux/actions'),
      'indexJS': resolve('src/indexJS/indexJS'),
      'CONF': resolve('src/CONF'),
      'images': resolve('src/assets/images')
    }
  },

  module: {
    rules: [{
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
        use: isDev ? ['style-loader', 'css-loader'] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: isDev ? ['style-loader', 'css-loader', {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        use: isDev ? ['style-loader', 'css-loader', 'sass-loader'] : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        parallel: true, //使用多进程并行运行来提高构建速度
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
      minSize: 30000, // 大于30k会被webpack进行拆包
      minChunks: 1, // 被引用次数大于等于这个次数进行拆分
      maxAsyncRequests: 5, // 最大的按需加载（异步）请求次数
      maxInitialRequests: 5, //入口最大并行数
      // automaticNameDelimiter: '~', // 打包分隔符
      name: false,
      cacheGroups: {
        // 拆分基础插件
        basic: {
          name: 'basic',
          priority: 3,
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|redux|react-redux|redux-saga|axios)[\\/]/
        },
        // 默认的配置
        vendors: {
          name: 'vendors',
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
    new webpack.DefinePlugin({
      'process.env.API': JSON.stringify(process.env.API)
    }),
    ...newHtmls
  ]
}