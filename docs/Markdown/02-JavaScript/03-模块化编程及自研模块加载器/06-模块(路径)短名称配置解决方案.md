
**1 目标**
* 理解模块短名称配置解决方案

**2 笔记**
* 理解模块短名称配置解决方案  
  **alias**
  > * 当模块标识很长时，可以使用`alias`配置来简化。

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