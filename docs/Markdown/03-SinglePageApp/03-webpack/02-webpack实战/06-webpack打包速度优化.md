
**1 目标**
* 打包结果分析
* 优化打包速度
* 长缓存优化

**2 笔记**
* 打包结果分析  
    **Chunks与Module**
    > * Chunks：chunks即代码块，即webpack把js分割成了几块代码  
    > * Module：模块，每一个文件即一个模块  

    **如何获取可视化的打包结果分析**
    > * [官方版本](http://webpack.github.io/analyse/)：Mac：`webpack--profile --json > stats.json`，Windows:`webpack --profile --json | Out-file 'stats.json' -Encoding OEM`  
    > * 社区版本：`webpack-bundle-analyzer`  

* 优化打包速度  
    **有哪些可以优化的点**
    > * 项目本身  
    >> * 1.减少依赖嵌套深度  
    >> * 2.使用尽可能少的处理  

    > * webpack层面  
    >> * 1.Dll处理  
    >> * 2.通过include减少loader范围  
    >> * 3.HappyPack  
    >> * 4.Uglify优化  
    >> * 5.减少resolve，sourcemap，cache-loader，用新版本的node和webpack  

* 长缓存优化  
    **长缓存优化**
    > * 把hash改为chunkhash  
    > * `NamedChunksPlugin`和`NamedModulesPlugin`  

**3 问题库**