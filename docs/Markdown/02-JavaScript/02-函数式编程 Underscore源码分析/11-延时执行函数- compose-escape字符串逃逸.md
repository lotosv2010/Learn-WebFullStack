
**1 目标**
* 延迟执行
* 函数组合
* 字符串转移

**2 笔记**
* 延迟执行  
  **`_.delay(function, wait, *arguments)`**  
    > * 类似`setTimeout`，等待`wait`毫秒后调用`function`，如果传递可选参数`arguments`，当函数`function`执行时，`arguments`会作为参数传入  
    ```javascript
    _.delay = function(func, wait) {
      var args = slice.call(arguments, 2)
      return setTimeout(function() {
        return func.apply(null, args)
      }, wait)
    }
    ```

  **函数组合(`compose`)**  
    > * `_compose(*functions)`  
    > * 返回函数集`functions`组合后的复合函数，也就是一个函数执行完之后把返回的结果再作为参数赋值给下一个函数来执行。以此类推，在数学里，把函数`f()`,`g()`,`h()`组合起来可以得到复合函数`f(g(h()))`  
 
  **字符串转义(`escape`)**
    > * 转义字符：也有更形象的译名脱逸字符、逃逸字符等。针对某些特定字符串转义并替换为特定字符串  
    > * `_.escape(string)`：转义`HTML`字符串，替换`&`，`<`，`>`，`"`，`'`，`/`等字符。  

**3 问题库**  
* `vue`项目优化  