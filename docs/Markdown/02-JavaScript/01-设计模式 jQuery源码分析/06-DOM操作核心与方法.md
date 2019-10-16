
**1 目标**
* html-text-css作用  

**2 笔记**
* html-text-css作用  
  **html-text-css作用**
  > * html(): 用为读取和修改元素的HTML标签  
  > * text(): 用来读取或修改元素的纯文本内容  
  > * css(): 设置或返回被选元素的一个或多个样式属性  
  > * 说明: text(),html().css()都是通过jQuery.access提供底层支持。jQuery.access()是一个多功能方法，作为set和get值来使用  

  > * 配置：
    ```javascript
    seajs.config({
      alias: {
        'a': 'common/js/a',
        'jquery': 'common/js/jquery'
      }
    })
    
    ```

  > * 应用:
    ```javascript
    define(function(require, exports, module) {
      var $ = require('jquery')
      $('#id').on('click', function() {})
    })
    
    ```  

  **paths**
  > * 当路径标识很长时，可以使用`paths`配置来简化。

  > * 配置：
    ```javascript
    seajs.config({
      paths: {
        'common': 'common/js',
        'static': 'static/js'
      }
    })
    ```

  > * 应用:
    ```javascript
    define(function(require, exports, module) {
      var _ = require('static/underscore')
      _.unique([1,2,3,4,3,4,2])
    })
    ``` 

  **preload**
  > * 用`preload`配置项，可以在普通模块加载前，提前加载并初始化好特定模块。

  > * 配置：
    ```javascript
    seajs.config({
      preload: [
        Function.prototype.bind ? '' : 'bind-polyfill',
        Object.keys ? '' : 'keys-polyfill'
      ]
    })
    ```

  > * 说明：`preload`中的空字符串会被忽略掉。


**3 问题库**  