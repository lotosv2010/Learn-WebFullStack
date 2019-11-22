
**1 目标**
* `throttle`
* `debounce`

**2 笔记**
* `throttle`  
  **`throttle`**  
    > * `throttle`和`debounce`是解决请求和响应速度不匹配的两个方案。二者的差异在于选择不同的策略  
    > * `throttle`的关注点是连续的执行间隔时间  

  **什么场景下使用?**  
    > * 多组件嵌套  
    > * 兄弟组件传值  
    > * 多组件共享状态  

* `debounce`  
  **`debounce`**
    > * `debounce`的关注点是空闲的间隔时间  

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