// import 'babel-polyfill';
import path from 'path'
import './index.ts'
import f1 from './module1'
import tool from 'gwb'

import '../css/app.css'
import '../css/app2.css'
// import '../css/app.scss'

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

import img1 from '../assets/img/1.jpg'
const img = new Image()
img.src = img1
document.body.appendChild(img)

console.log(path.join(__dirname, 'dist'))

import('./module2.js').then(res => {
  console.log('异步加载', res)
})