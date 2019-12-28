# webpack
webpack打包配置

- "webpack": "^4.41.5",

- "webpack-cli": "^3.3.10"
- "node": "10.15.3"

## 1,入门

### 1.1 初始化项目

```
yarn init

yarn add webpack webpack-cli -D
```

- 新建一个文件夹`src` ,然后新建一个文件`main.js`

  ```js
  console.log('hello world')
  ```

- 配置script命令

  ```json
  "scripts": {
    "test": "webpack src/main.js"
  },
  ```

- 执行

  ```
  yarn build
  ```


### 1.2 项目配置

- 新建build文件夹，新建`webpack.config.js`

  ```
  module.exports = {
      // 省略其他配置
      output: {
        filename: 'js/[name].[hash:8].js'      // 打包后的文件名称
      }
  }
  ```

- 执行

  ```
  yarn build 
  
  生成dist目录下会有一个js文件夹，里面会有打包生成的js文件
  ```



### 1.3 配置html模板

```
yarn add html-webpack-plugin -D
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'development', // 开发模式
    entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
    output: {
      filename: '[name].[hash:8].js'      // 打包后的文件名称
    },
    plugins:[
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html')
      })
    ]
}
```

- 多入口

  ```
  多个new HtmlWebpackPlugin({})
  ```



- #### clean-webpack-plugin

  ```js
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  module.exports = {
      // ...省略其他配置
      plugins:[new CleanWebpackPlugin()]
  }
  ```


### 1.4 处理css



#### loader处理

```
yarn add style-loader css-loader -D
```

```
yarn add less less-loader -D
```

```
yarn add sass sass-loader node-sass -D
```

```js
module.exports = {
    // ...省略其他配置
    module:{
      rules:[
        {
          test:/\.css$/,
          use:['style-loader','css-loader'] // 从右向左解析原则
        },
        {
          test:/\.less$/,
          use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
        }
      ]
    }
} 
```



#### 添加css前缀

```
yarn add postcss-loader autoprefixer -D
```

```js
module.exports = {
    module:{
        rules:[
            test/\.less$/,
            use:['style-loader','css-loader','postcss-loader','less-loader']
        ]
    }
}
```

- 引入`autoprefixer`

  ```
  在根目录创建 `postcss.config.js`文件
  
  module.exports = {
      plugins: [require('autoprefixer')]  // 引用该插件即可了
  }
  
  在packjson里添加
  
  "browserslist": [
      "defaults",
      "> 1%",
      "not ie <= 8"
  ]
  ```



#### 拆分css

```
yarn add mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //...省略其他配置
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
           MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: "css/[name].[hash].css"
    })
  ]
}
```



### 1.5 打包 图片、字体、媒体、等文件

```
yarn add file-loader url-loader -D
```

```js
module.exports = {
  module: {
    rules: [
      // ...
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
      }
    ]
  }
}
```



### 1.6 处理js

```
yarn add babel-loader @babel/preset-env @babel/core -D
```

- 在根目录创建.babelrc文件

  ```
  {
  	"presets": [
  		"@babel/preset-env"
  	]
  }
  ```

- webpack配置

  ```
  {
  	test: /\.jsx?$/,
  	loader: 'babel-loader'
  	exclude: /node_modules/
  },
  ```

- polyfill



## 2,React

### 2.1 基础

```
yarn add react reac-dom

yarn add @babel/preset-react webpack-dev-server cross-env webpack-merge -D
```



### 2.2 其他配置

- 装饰器

  ```
  yarn add @babel/plugin-proposal-decorators -D
  ```

- 类属性

  ```
  yarn add @babel/plugin-proposal-class-properties -D
  ```

  ```
  "plugins": [
  		["@babel/plugin-proposal-decorators",{"legacy": true}], // 配置对装饰器的支持
  		["@babel/plugin-proposal-class-properties",{"loose": true}], // 支持类属性的插件
  		[
  			"import",
  			{	
  				"libraryName": "antd",
  				"libraryDirectory": "es",
  				"style": true // `style: true` 会加载 less 文件
  			}
  		]
  	]
  
  ```










### 2.2 antd

- 按需导入

  ```
  yarn add babel-plugin-import -D
  ```

- babelrc

  ```
  {
  	"presets": [
  		[
  			"@babel/preset-env",
  			{
  				"modules": false
  			}
  		],
  		"@babel/preset-react"
  	],
  	"plugins": [
  		[
  			"import",
  			{
  				"libraryName": "antd",
  				"libraryDirectory": "es",
  				"style": true // `style: true` 会加载 less 文件
  			}
  		]
  	]
  }
  ```




## 生产环境

```
mini-css-extract-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```

