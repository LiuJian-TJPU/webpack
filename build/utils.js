const path = require('path');
const fs = require('fs');

const resolve = p => path.resolve(__dirname, '../', p);

/**
 * 是否是开发环境
 */
const isDev = process.env.NODE_ENV === 'development';

/**
 * 获取多页面入口
 */
const getEntry = () => {

  let entryJs = {};
  let entryHtml = {};
  const entryPath = resolve('src/pages')

  const existPath = fs.existsSync(entryPath);
  if (existPath) {
    const dir = fs.readdirSync(entryPath);
    dir.forEach(item => {
      entryJs[item] = resolve(`src/pages/${item}/main.js`);
      entryHtml[item] = (resolve(`src/pages/${item}/index.html`))
    })
  } else {
    throw new Error('没有pages文件夹')
  }
  // console.log(entry);
  // console.log(entryHtml);
  return {
    entryJs,
    entryHtml
  };
}

module.exports = {
  isDev,
  resolve,
  getEntry
}