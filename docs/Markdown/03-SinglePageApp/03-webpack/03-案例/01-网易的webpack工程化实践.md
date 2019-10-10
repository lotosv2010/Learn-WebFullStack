
**1 目标**
* eslint
* 一些特别的plugins和loader
* 环境区分
* 项目问题解决

**2 笔记**
* eslint  
    **相关包**
    > * `Eslint+eslint-loader`-核心内容  
    > * `Eslint-plugin-html`  
    > * `Eslint-friendly-formatter`-友好提示  
    > * `Eslint-config-standard`-代码风格标准，依赖`Eslint-plugin-import`，`Eslint-plugin-node`，`Eslint-plugin-promise`，`Eslint-plugin-standard`  

* 一些特别的plugin和loader  
    **plugins**
    > * `webpack.DefinePlugin`  
    > * `webpack.HashedNoduleIdsPlugin`  
    > * `webpack.NoEmitOnErrorsPlugin`  
    > * `webpack.ProvidePlugin`  
    > * `copy-webpack-plugin`  
    > * `mini-css-extract-plugin`  

* 环境区分
    **版本差异————项目有哪些**
    > * 开发  
    > * 测试  
    > * 预发  
    > * 线上  

    **版本差异————配置环境**
    > * 开发  
    > * 测试  
    > * 线上  

* 项目问题解决  
    **不要把配置当配置**
    > * 当成一个程序  

    **解决方案归纳**
    > * 如果是要对模块内容进行处理： loader是第一解决方案  
    > * 如果要增加一些特殊的功能：可以自定义添加插件  
    > * 项目上的打包简化，可变性配置等：通过编写相应的操作函数  

**3 问题库**