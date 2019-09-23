
**1 目标**
* webpack的环境系统
* 不同环境下的配置编写
* webpack4中的环境区分

**2 笔记**
* webpack的环境系统  
    **为什么要区分环境**
    > * 因为在不同的场景下可能需要不同的配置，使用不同的功能，所以要区分环境  
    > * 开发模式：会额外的用到一些调试功能，比如webpack-dev-server，但是为了加快调试速度，可能不会去用上压缩，tree-shaking之类的功能  
    > * 生产模式：为了减少文件体积，会使用压缩，tree-shaking等功能，但是不要加webpack-dev-server或者eslint这样的调试工具  

    **如何告诉webpack当前的环境**
    > * `webpack --env envname`  

* 不同环境下的配置编写  
    **如何编写不同的噢诶之文件来区分环境**
    > * 编写一个开发环境下的配置文件  
    > * 编写一个生产环境下的配置文件  
    > * 在基础配置引入开发和生产配置  
    > * 判断env参数合并对应的配置  

* webpack4中的环境区分  
    **webpack4中更简单的环境区分**
    > * `webpack --mode production/development/none`  

    **bem css规范**
    > * `.person{}`  
    > * `.person__hand{}`  
    > * `.person--female{}`  
    > * `.person--female__hand{}`  
    > * `.person__hand--left{}`  

**3 问题库**