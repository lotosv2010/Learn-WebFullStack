
**1 目标**
* `map-reduce`
* 理解依赖管理

**2 笔记**
* `map-reduce`  
  **`map-reduce`**  
    > * `JavaScript Array.prototype`提供的 `map` 和 `reduce` 函数不仅是存在于`JavaScript`的两个`API`，更是函数式编程语言重要的组成部分，是一种对列表的操作思路  
    > * `map-reduce`由如下两个独立的部分组成：  
    > * `map`（映射）：  
    >> * 一个映射过程就是将各个元素，按照一定的规则，逐个映射为新的元素。这是一个一一对应的过程  
    >> * 用数学公式描述就是（其中，函数ff就是这个规则）  
    > * `reduce`（规约）：  
    >> * 一个规约过程仍需要迭代指定列表的每个元素，然后仍然按照一定规则，合并这些元素到一个目标对象上。这是一个由多至一的过程，或者说一个逐步积累的过程  
  **`underscore reduce`**  
    > * `underscore`通过内部函数`createReducer`来创建`reduce`函数：  
    >> * 区分`reduce`的方向`dir`，是从序列开端开始做规约过程，还是从序列末端开始做规约过程  
    >> * 判断用户在使用`.reduce`或者`.reduceRight`时，是否传入了第三个参数，即是否传入了规约起点  
    ```javascript
    // 源码
    var createReduce = function(dir) {
      var reducer = function(obj, iteratee, memo, initial) {
        // ...
      }
      return function(obj, iteratee, memo, context) {
        return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial)
      }
    }
    ```

* 真值检测函数  
  **概述**  
    > * 在`underscore`中，除了`_.each,_.map,_.reduce`等函数操作集合，还提供了`_.filter,_.reject,_.every,_.some`这几个基本逻辑判断的集合操作函数 
    > * 无一例外的是，这些函数都依赖于用户提供的真值检测函数，用来判断当前迭代元素是否满足条件。`underscore`将其值检测函数参数命名为`predicate`
    
**3 问题库**  