
**1 目标**
* 不利用配置文件打包  
* 利用配置文件打包
* 局部webpack与全局webpack

**2 笔记**
* 不利用配置文件打包  
    **直接指定出口与入口**
    > * `webpack-cli --entry <entry> --output <output>`  

    **打包分析**
    > * ![打包分析]()  

* 利用配置文件打包  
    **webpack.config.js**
    ```javascript
    var webpack = require('webpack')
    var PurifyWebpack = require('purifycss-webpack)
    module.exports = {
        entry: {},
        output: {},
        module: {
            rules: []
        },
        plugins: []
    }
    ```

    **命令**
    > * webpack: 默认找webpack.config.js  
    > * webpack <config文件>  

* 局部webpack与全局webpack  
    **全局webpack**
    > * 概念：通过 `npm install webpack -g`命令安装的webpack就是全局的webpack，-g指令就是在npm全局目录下安装包  
    > * 作用：全局webpack是必须安装的，我们在命令行直接执行webpack指令时，使用的就是全局的webpack去完成的。  

    **局部webpack**
    > * 概念：局部的webpack是指在项目文件夹下安装的webpack，即安装在项目文件夹里的node_modules里  
    > * 作用：全局webpack有且只有一个，但实际情况中，不同项目的webpack版本可能完全不同，当我们项目需求的webpack版本和我们全局的webpack不一致时，就需要安装局部的webpack。  

**3 问题库**