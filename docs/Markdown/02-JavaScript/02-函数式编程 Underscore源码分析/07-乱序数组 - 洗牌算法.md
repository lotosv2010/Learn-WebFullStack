
**1 目标**
* 理解`vuex`
* `sass`的使用及封装
* `vue`项目优化

**2 笔记**
* `vuex`  
  **`vuex`是什么?**  
    > * 是一个专为`Vue.js`应用程序开发的状态管理模式（也称全局状态管理）  
    > * 什么是"状态管理模式"?  
    >> * 从视图层事件源到数据变迁的映射过程的一个管理  
    > * 运行机制  
    >> * 采用集中式存储管理应用所有组件的状态，并以相应的规则保证状态以一种可以预测的方式发生变化（统一管理）

  **什么场景下使用?**  
    > * 多组件嵌套  
    > * 兄弟组件传值  
    > * 多组件共享状态  

* `sass`的使用及封装  
  **安装`sass(cli 2.x)`**
    > * `npm install --save-dev sass-loader`(安装`sass`)  
    > * `npm install --save-dev node-sass`(`sass-loader`依赖于`node-sass`)  
    > * 配置`Sass`解析器 `webpack.base.conf.js`  

    ```javascript
    {
      test: /\.sass$/,
      loaders: ['style', 'css', 'sass']
    }
    ```

  **封装**
    > * `@mixin`混合封装  
    ```sass
    @mixin rounded-corners {
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      border-radius: 5px
    }
    ```

    > * 变量封装 

    ```sass
    $link-color: blue;
    a{
      color: $link-color;
    }
    ```
    ```css
    // 编译后
    a {
      color: blue;
    }
    ```

* `vue`项目优化  
  **从那些方面入手**
    > * `js,css`代码公用代码提取，`ui`框架按需引入  
    > * `js,css`代码的压缩  
    > * 图片文件的压缩`(tinypng.com)`，太大的直接放`cdn`  
    > * `gzip`压缩(服务端压缩)  
    > * `cdn`加速(节点速度快，不需要占用本地资源)  

  **`DllPlugin`**
    > * `DLL(Dynamic Link Library)`文件为动态链接库文件，在`windows`中许多应用程序并不是一个完整的可执行文件，它们被分割成一些相对独立的动态链接库，即`DLL`文件，放置于系统中。当执行某一个程序时，相应的`DLL`文件就会被调用。  

**3 问题库**  
* `vue`项目优化  