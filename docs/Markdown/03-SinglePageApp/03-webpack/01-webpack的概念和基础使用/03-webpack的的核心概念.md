
**1 目标**
* 配置文件的重要性
* 核心概念

**2 笔记**
* 配置文件的重要性  
    **配置文件**
    > * 配置文件是webpack打包的依据，webpack如何打包，打包成什么样，全都由配置文件来指定  
    > * 对webpack，我们的主要工作也是编写、修改webpack的配置文件  

* 核心概念  
    **Entry和Output**
    > * entry：是webpack的打包入口；代码从这里开始编译；程序开始的起点  
    > * output: 是webpack的打包出口；最终的打包结果会根据output的定义输出；会影响到资源的路径   

    **loader**
    > * webpack自身只能处理JavaScript，所以对于别的资源需要loader  
    > * webpack自身只能负责打包，相关的编译等操作，需要loader  
    > * loader本质是一个方法，使用时大多需要额外安装
    > * 常用的loader  

    **plugin**
    > * 一些插件式的额外功能由plugin定义，帮助webpack优化代码，提供功能  
    > * plugin有的是webpack自带的，也需要额外的安装的  
    > * 常用的plugin

**3 问题库**
* 常用的loader  
* 常用的plugin  