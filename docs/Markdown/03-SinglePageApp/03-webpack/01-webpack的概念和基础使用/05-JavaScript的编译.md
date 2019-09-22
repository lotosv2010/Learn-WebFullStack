
**1 目标**
* 编译es6  
* 编译语法糖  

**2 笔记**
* 编译es6  
    **编译需要安装的loader**
    > * `npm install babel-loader @babel/core --save-dev`  

    **`Babel-preset`**  
    > * `Babel-preset`是存储JavaScript不同标准的插件，通过使用正确的presets，告诉babel按照哪个规范编译  
    > * `npm install @babel-preset-env --save-dev`  
    > * `Babel-preset`的target配置：target是preset的核心配置，告诉preset编译的具体目标

    **es6方法的编译**  
    > * `npm install babel-polyfill --save-dev`  
    > * `npm install @babel/plugin-transform-runtime @babel/runtime --save`  

    **babel-polyfill的生效方式**  
    > * 生成一个全局对象  
    > * 一般用于项目开发  

    **babel-transform-runtime的生效方式**  
    > * 生成一个局部对象  
    > * 一般用于框架开发  

* 编译语法糖  
    **Typescript**
    > * `npm install typescript`  
    > * `npm install ts-loader`  
    > * webpack.config.js配置module  
    > * 配置tsconfig.json  

**3 问题库**