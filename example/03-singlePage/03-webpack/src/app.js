// import 'babel-polyfill';
import './index.ts'
import f1 from './module1'
import tool from 'gwb'

import './app.css'
import './app2.css'
// import './app.scss'

// new Promise(setTimeout(() => {
//   console.log('p')
// }))
f1()
let b = 2

async function a() {}


const obj = {
  name: 'robin',
  age: 18
}
console.log('tool', tool.deepClone(obj))