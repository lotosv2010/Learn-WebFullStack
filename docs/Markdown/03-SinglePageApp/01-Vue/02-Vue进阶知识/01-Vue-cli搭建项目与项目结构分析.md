
**1 目标**
* 了解`Vue-cli`
* `Vue-cli`与`webpack`

**2 笔记**
* 了解`Vue-cli`  
    **`Vue-cli`是`Vue.js`的脚手架，用于自动生成`vue.js+webpack`的项目模板，分为两种：**  
    > * `vue init webpack-simple` 项目名  
    > * `vue init webpack` 项目名  

    **`Vue-cli`可以快速构建单页面应用**  
    > * 涉及内容很多，如`webpack、npm、nodejs`等  

* 基于`Vue-cli`快速构建 — 实战步骤  
    > * 01 安装node.js  
    > * 02 下载服务器框架  
    > * 03 实现一个静态服务器

* 项目结构  
    > * `build` 里面是一些操作文件，使用`npm run *`时其实执行的就是这里的文件  
    > * `config` 配置文件，执行文件需要的配置信息  
    > * `src` 资源文件，所有的组件以及所有的图片
    > * `static` 静态文件目录
    > * `test` 测试文件目录
    > * `index.html` 入口文件 

* `Vue-cli`与`webpack`  
    **webpack：**
    > * 前端资源模块化管理和打包工具  
    > * 可以将很多松散的模块，按依赖和规则打包成符合生产环境部署的前端资源  
    > * 可以将按需加载的模块进行代码分割，等实际需要的时候载异步加载   

    **Vue-cli：**
    > * 用配置好的模板迅速搭建项目工程，省去自己配置webpack配置文件的基本内容  

**3 问题库**