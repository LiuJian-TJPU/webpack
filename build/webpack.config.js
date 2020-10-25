const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const resolve = (p) => path.resolve(__dirname, "../", p);

// process.env.NODE_ENV = "development";
module.exports = {
  // mode: "production", // 生产模式
  mode: "development", // 开发模式
  // devtool: "source-map",
  devtool: false,
  entry: resolve("src/main.js"), // 入口文件

  output: {
    filename: "js/[name][chunkhash:8].js", // 打包后的文件名称
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // 兼容低版本处理器。
        // 1 @babel/polyfill 全部引入太大
        // 2 core-js 按需加载。
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: {
                  version: 3,
                },
                targets: {
                  ie: "11",
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "[name].[hash:4].[ext]",
            outputPath: "images/",
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.css$/,
        // use:['style-loader','css-loader', 'postcss-loader'] // 从右向左解析原则
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("postcss-preset-env")()],
            },
          },
        ], // 从右向左解析原则
      },
      {
        test: /\.less$/,
        // use:['style-loader','css-loader','postcss-loader','less-loader'] // 从右向左解析原则
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ], // 从右向左解析原则
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        parallel: true, //使用多进程并行运行来提高构建速度
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false, // 去掉注释
          },
        },
        extractComments: false, // 不提取注释，默认true
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
    }),
  ],
};
