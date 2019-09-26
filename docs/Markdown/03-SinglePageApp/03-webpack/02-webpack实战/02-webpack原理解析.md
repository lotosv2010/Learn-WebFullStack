
**1 目标**
* `webpack`原理  
* `loader`原理  
* 结果文件分析  
* `Dev-server`原理分析  
* 热更新原理  

**2 笔记**
* `webpack`原理  
    **`webpack`是利用什么来打包**
    > * `webpack`依赖于node的环境与文件操作系统  
    > * `webpack`的打包过程，其实就是利用node去读取文件，然后进行一些字符串处理后，再利用node去写入文件  
  
    **`webpack`打包流程解析**
    > * 读取配置文件  
    > * 注册内部插件与配置插件  
    > * loader编译  
    > * 组织模块  
    > * 生成最终文件导出  

* `loader`原理
    **`loader`是如何生效的**
    > * loader其实是一个方法，接受一个字符串，方法内部处理完后再返回字符串  
    > * `module.export = function(source) { return source}`  

* 结果文件分析  
    **打包结果分析**
    **如何排队模块**  

* `Dev-server`原理分析
    **`Dev-server`**
    > * `Dev-server`利用express和一个中间件`webpack-dev-middleware`来开启服务，然后开启的server会执行打包出来的代码  

* 热更新原理
    **步骤**
    > * 开启服务  
    > * 建立一个websocket链接  
    > * 发生代码改变，服务通过websocket通知到客户端  
    > * 客户端替换新代码  

**3 问题库**