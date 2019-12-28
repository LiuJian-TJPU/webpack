const path = require('path');

const resolve = p => path.resolve(__dirname, p);

const isDev = process.env.NODE_ENV === 'development';


module.exports = {
  isDev,
  resolve
}