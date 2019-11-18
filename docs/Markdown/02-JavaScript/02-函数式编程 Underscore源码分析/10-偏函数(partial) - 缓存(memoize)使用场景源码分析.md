
**1 目标**
* 理解`partial`
* 理解`memoize`

**2 笔记**
* 理解`partial`  
  **`_.partial`**  
    > * 偏函数(`partial`)反映了新函数是原函数的一部分。`underscore`的`_.partial`就能返回一个偏函数  
    > * `_.partial(func, ...args)`应用一个函数填充在任意个数的参数，不改变其动态`this`和`bind`方法相近  
    ```javascript
    // 源码
    _.partial = restArgs(function(func, boundArgs) {
      var placeholder = _.partial.placeholder;
      // 返回一个partial后的新函数
      var bound = function() {
        // ...
      }
      return bound;
    }) 
    ```

* 理解`memoize`  
  **`_.memoize`**
    > * `_.memoize(function, [hashFunction])`：`memoize`方法可以缓存某函数的计算结果  
    > * 如果传递了hashFunction参数，就用hashFunction的返回值作为key存储函数的计算结果。hashFunction默认使用function的第一个参数作为key，memoize值的缓存可作为返回函数的cache属性  
    ```javascript
    // 源码
    _.memoize = function(func, hasher) {
      var memoize = function(key) {
        // 执行记忆函数的时候，先获取缓存
        var cache = memoize.cache;
        // 获得缓存地址
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        // ...
      }
      return memoize;
    }
    ```
    > * `_.memoize`将缓存绑定到了缓存函数的`cache`属性上  
    > * 在创建一个缓存函数时，除了提供原函数`func`用来计算值外，还可以提供`hasher`函数来自定义如何获取缓存的位置  
    > * 如果`hasher`不设置，则以缓存函数的参数key标识缓存位置  
    ```javascript
    // 用例
    var fibonacci = _memoize(function(n) {
      return n < 2 ? n fibonacci(n - 1) + fibonacci(n - 2);
    })

    fibonacci(5); // => 5
    console.log(fibonacci.cache);
    // => {0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 5}
    ```

**3 问题库**  