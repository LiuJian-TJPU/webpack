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
  
  ```


