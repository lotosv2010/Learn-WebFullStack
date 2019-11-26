
**1 目标**
* 属性操作
* `createAssigner`

**2 笔记**
* 属性操作  
  **`has`**  
    > * `_.has(object, key)`  
    > * 检测`object`对象是否包含给定的key属性  
    ```javascript
    _.has = function(obj,key) {
      // obj 不能为null 或者 undefined
      return obj != null && hasOwnProperty.call(obj, key);
    }
    ```

  **`invert`**  
    > * `_.invert(object)`  
    > * 返回一个`object`副本，使其键(`keys`)和值(`values`)对换。对于这个操作，必须确保`object`里所有的值都是唯一的且可以序列号成字符串  
    ```javascript
    _.invert = function(obj) {
      var result = {}
      var keys = _.keys(obj);
      // ...
      for(var i = 0; i < length; i++) {
        result[obj[keys[i]]] = keys[i]
      }
      return result
    }
    ```

  **`keys`**  
    > * `_.keys(object)`  
    > * 检测`object`对象所有的属性名称  
    ```javascript
    _.keys = function(obj) {
      var keys = []
      if(nativeKeys) {
        return nativeKeys(obj)
      }
      // ...
      return keys;
    }
    ```

* `createAssigner` 
  **`createAssigner`**
    > * `underscore`中提供了两个方法用于对象属性的扩展  
    >> * `_.extend`  
    >> * `_.extendOwn`  
    > * 这两个函数内部都是由`createAssigner`进行创建的  
    > * `createAssigner`接受两个参数  
    >> * `keysFunc`:获取对象属性的方式  
    >> * `defaults`:声明是否覆盖属性  
    > * 返回一个属性分配器  
    ```javascript
    var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

**3 问题库**    