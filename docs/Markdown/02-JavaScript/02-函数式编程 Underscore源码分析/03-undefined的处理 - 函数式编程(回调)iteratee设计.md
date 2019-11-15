
**1 目标**
* `undefined`的处理  
* `iteratee`设计

**2 笔记**
* `undefined`的处理  
  **`undefined`的处理**  
    > * 不可靠的`undefined`  
    >> * 在`JavaScript`中，假设我们想判断一个变量是否是`undefined`，通常会这样写：  
    ```javascript
    if(a === undefined) {}
    ```
    >> * 但`JavaScript`中的`undefined`并不可靠，例如：  
    ```javascript
    function test(a) {
      var undefined = 1
      console.log(undefined) // => 1
      if(a ==== undefined) {
        // ...
      }
    }
    ```

* iteratee设计  
  **iteratee设计**  
    > * 一个迭代至少由两部分构成：  
    >> * 被迭代集合  
    >> * 当前迭代过程  
    > * 在`underscore`中，当前迭代过程是一个函数，称为`iteratee`迭代器，它将对当前迭代元素进行处理  
    ```javascript
    // 源码
    _.map = function(obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          results = Array(length); //定义初始化数组
      for(var index = 0;index < length; index++) {
        var currentKey = keys? keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    }
    ```

  **`cb`**  
    > * 我们传递`_.map`的第二个参数就是一个`iteratee`，它可能是函数、对象、甚至字符串，`underscore`会将其统一处理为一个函数  
    > * 这个处理由`underscore`的内置函数`cb`完成  
    > * `cb`将根据不同情况，为我们的迭代创建一个迭代过程iteratee，服务于每轮迭代  
    ```javascript
    // 源码
    var cb = function(value, context, argCount) {
      // 是否用自定义的iteratee
      if(_.iteratee !== builtinIteratee) {
        return _.iteratee(value, context);
      }
      // 针对不同的情况
      if(value === null) {
        return _.identity;
      }
      // ...
    }
    ```

  **`optimizeCb`**  
    > * 当传入的`value`是一个函数时，value还要经过内置函数`optimizeCb`才能获得最终的`iteratee`  
    > * 含义：是一个对最终返回的iteratee进行优化的过程  
    > * 总体思路：可选传入待优化的回调函数`func`，以及迭代回调需要的参数个数`argCount`，根据参数个数分情况进行优化  
    > * 源码：  
    ```javascript
    // 源码
    var optimizeCb = function(func, context, argCount) {
      if(context === void 0) {
        return func;
        // ...
      }
    }
    ```

**3 问题库**  
