
**1 目标**
* Underscore结构  
* 面向对象风格支持  
* mixin  
* 链接式调用  

**2 笔记**
* Underscore结构  
  **作用域包裹**  
    > * 与其他第三方库一样，Underscore也是通过立即执行函数来包裹自己的业务逻辑  
    > * 目的：  
    >> * 避免全局污染：所有库的逻辑，库所定义和使用的变量全部被封装到了该函数的作用域中  
    >> * 隐私保护：但凡在立即执行函数中声明的函数、变量等，除非是自己想暴漏，否则绝无可能在外部获得  
    ```javascript
    (function() {
      // ......执行逻辑
    })()
    ```

  **`_`对象**  
    > * Underscore有下划线的意思，所以Underscore通过一个下划线变量`_`来识别自身  
    > * 注意：  
    >> * `_`是一个函数对象，之后所有的api都会被挂载到这个对象上，如`_.each`，`_.map`等  
    >> * 隐私保护：但凡在立即执行函数中声明的函数、变量等，除非是自己想暴漏，否则绝无可能在外部获得  
    ```javascript
    var _ = function(obj) {
      if(obj instanceof _) {
        return obj
      }
      if(!(this instanceof _)) {
        return new _(obj)
      }
      this._wrapped = obj
    }
    ```

* 面向对象风格支持  
  **`_()`**  
    > * 虽然Underscore推崇函数式编程，但也支持面向对象风格的函数调用，仅需要通过`_()`来包裹对象即可  
    > * 当我们进行调用时：`_([2, 3, 4])`，会创建一个新的Underscore对象(从而能够调用Underscore提供的方法)，并在this._wrapped中存储传入的数据  

* `mixin`  
  **`mixin`**  
    > * `mixin(混入)`模式是在增加代码复用度的一个广泛使用的设计模式  
    > * `_.mixin(obj)：为Underscore对象混入obj具有的功能  
    ```javascript
    // 源码
    _.mixin = function(ojb) {
      _.each(_.function(obj), function(name) {
        var func = _[name] = obj[name];
        _prototype[name] = function() {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return chain(this, func.apply(_, args));
        }
      })
    }
    ```

* 链接式调用  
  **链接式调用**  
    > * Jquery链接式调用  
    ```javascript
    $('.div').css('color', 'red').show()
    ```
    > * 想要实现链接式调用，通常我们会在支持链接式调用的函数中返回对象本身  
    ```javascript
    var RULES = function() {
      add: function(x) {
        console.log(x);
        return this;
      },
      mult: function(y) {
        console.log(y);
        return this;
      }
    }
    RULES.add(4).mult(5)
    ```
    > * 但是，这样做并不优雅，这需要我们手动地在函数中添加`return this`语句。更好的做法是我们创建一个通用函数，它能为指定的对象方法增加链式调用机制  
  **`_chain()`**  
    > * `_chain(obj)`：为Underscore对象的方法增加链式调用能力  
    ```javascript
    // 源码
    _.chain = function(obj) {
      var instance = _(obj)
      instance._chain = true;
      return instance;
    }
    ```
    > * Underscore还提供了一个帮助函数result，该函数将会判断方法调用结果，如果该方法的调用者被标示了需要链化，则链化当前的方法执行结果  
    ```javascript
    var chainResult = function(instance, obj) {
      return instance._chain ? _(obj).chain() : obj;
    }
    ```
    > * 但是，这样做并不优雅，这需要我们手动地在函数中添加`return this`语句。更好的做法是我们创建一个通用函数，它能为指定的对象方法增加链式调用机制  

**3 问题库**  