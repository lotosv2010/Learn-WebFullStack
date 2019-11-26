
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

**3 问题库**   