
**1 目标**
* `rest`
* `Object.create polyfill`

**2 笔记**
* `rest`  
  **`rest`参数**  
    > * 即自由参数、松散参数，自由和松散指参数个数是随意的，与之对应的是固定参数  
    > * `ES6`引入`rest`参数(形式为...变量名)，用于获取函数的多余参数，这样就不需要使用`arguments`对象  
    > * `rest`参数搭配的变量是一个数组，该变量将多余的参数放入数组中  
    > * `underscore`的官方实现，它暴露了一个`_.restArguments`方法，通过给该方法传递一个函数，能够使得函数支持rest参数  
    ```javascript
    // 源码
    var restArguments = function(func, startIndex) {
      startIndex = startIndex === null ? func.length - 1 : +startIndex;
      retrun function() {
        var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
        for(; index <length; index++) {
          rest[index] = arguments[index + startIndex];
        }
      }
      // ...
    }
    ```

* `Object.create polyfill`  
  **`Object.create()`**  
    > * `Object.create`： 
    >> * `Object.create()`方法创建一个新对象，使用现有的对象提供新创建的对象的`__proto__`  
    >> * `Object.create`不依赖构造函数，它内部维护了一个构造函数，并将该构造函数`prototype`属性指向传入的对象，因此，他比`new`更灵活  
    > * `underscore`如何创建对象：  
    >> * `underscore`利用`baseCreate`创建对象时，会先检查当前环境是否已支持`Object.create`，如不支持，会创建一个简易的`polyfill`
  
**3 问题库**  
