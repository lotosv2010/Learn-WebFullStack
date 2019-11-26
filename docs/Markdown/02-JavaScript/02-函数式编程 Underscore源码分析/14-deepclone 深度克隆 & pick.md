
**1 目标**
* `deepClone`
* `pick`

**2 笔记**
* `deepClone`  
  **`clone`**  
    > * `_.clone(object)`克隆一个`object`对象副本  
    ```javascript
    _.clone = function(obj) {
      if(!_isObject(obj)) return obj
      return _isArray(obj) ? obj.slice() : _extend({}, obj);
    }
    ```

  **`deepClone`**  
    > * `_.deepClone(object)`深度克隆   
    ```javascript
    _.deppClone = function(obj) {
      if(_.isArray(obj)) {
        // ...
      } else if(_.isObject(obj)) {
        // ...
      } else {
        return obj;
      }
    }
    ```

* `pick`  
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

**3 问题库**   