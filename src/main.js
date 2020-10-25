// import "@babel/polyfill";
import a from "./a";
// import { b } from './b'
// import c from './c'
// console.log(b)

a(1, "a");
// b(2, "b")
// c.e('world')

// import "./css-modules";

const f = (x, y) => {
  return console.log(x + y);
};

console.log(f(1, 2));
new Promise((r) => {
  setTimeout(r, 1000, 300);
}).then((r) => console.log(r));
