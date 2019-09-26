
**1 目标**
* `webpack-dev-server`  
* 代理接口
* 热更新
* `source-map`  

**2 笔记**
* `webpack-dev-server`  
    **什么是`webpack-dev-server`**
    > * 项目最终都要打包上线，所以最好能模拟线上环境进行开发调试  
    > * `webpack-dev-server`就是一个让我们可以模拟线上环境进行项目调试的工具  

    **`webpack-dev-server`提供的常用额外功能**
    > * 路径重定向  
    > * 浏览器中显示编译错误  
    > * 接口代理  
    > * 热更新  

    **`webpack-dev-server`使用步骤**
    > * 安装`webpack-dev-server`  
    > * 配置devServer字段  
    > * 利用命令行开启服务  

    **`devServer`常用配置**
    > * `inline`: 服务的开启模式，默认为true  
    > * `port`: 代理接口  
    > * `historyApiFallback`: 路径重定向  
    > * `hot`: 热更新  
    > * `lazy`: 懒编译  
    > * `overlay`: 错误遮罩  
    > * `proxy`: 代理请求  

* 代理接口  
    **如何开启代理接口**
    ```javascript
    devServer: {
        proxy: {
            '/'： {
                target: '128.23.321.1',
                changeOrigin: true,
                pathRewrite: {
                    '^/comments': '/api/comments'
                },
                headers: {}
            }
        }
    }
    ```  

* 热更新  
    **如何开启热更新**
    ```javascript
    devServer: {
        hot: true,
        hotOnly: true
    }
    ```  

* `source-map`
    **什么是`source-map`**
    > * 为了方便调试，我们需要知道打包后的代码对应于原文件的位置  
    > * 如果代码有一处错误，无`source-map`只能追踪到错误发生在打包后文件的那个位置，但是打包后的文件不方便阅读  
    > * 有了`source-map`，就可以查看错误发生在原模块的那个地方  

    **`source-map`的模式**
    > * 开发模式：eval/eval-source-map/cheap-eval-source-map/cheap-module-source-map
    > * 生成模式：source-map/hidden-source-map/nosource-source-map

**3 问题库**