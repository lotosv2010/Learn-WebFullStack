
**1 目标**
* 理解`unique`
* 理解`compact`
* 理解`range`

**2 笔记**
* 理解`unique`  
  **`_.unique`**  
    > * 语法：`_.unique(array, isSorted, iteratee)`  
    > * 根据iteratee设置的重复标准，对array进行取重，通过isSorted，提高对有序数组的取重效率  
    ```javascript
    // 源码
    _.uniq = _.unique = function(array, isSorted, iteratee) {
      if(!_.isBoolean(isSorted)) {
        context = iteratee;
        iteratee = isSorted;
        isSorted = false;
      }
      if(iteratee != null) iteratee = cb(iteratee, context);
      var result = [];
      var seen = [];
      // ...
      return result;
    }
    ```

* 理解`compact`  
  **`_.compact`**  
    > * 语法：`_.compact(array)`  
    > * 去除`array`中所有"假值"项目  
    > * 在`JavaScript`中，这些被认为具有"假值"意向  
    ```javascript
    false
    null
    0
    ""
    undefined
    NaN
    ```
    > * 如何验证  
    ```javascript
    Boolean(false); // => false
    Boolean(null); // => false
    Boolean(0); // => false
    Boolean(""); // => false
    Boolean(undefined); // => false
    Boolean(NaN); // => false
    ```
    > * 源码  
    ```javascript
    // 源码
    _.compact = function(array) {
      return _.filter(array, Boolean);
    }
    ```
    > * 用例  
    ```javascript
    // 用例
    _.compact([0, 1, false, 2, '', 3]) // => [1, 2, 3]
    ```

* 理解`range`
  **`_.range`**  
    > * 语法：`_.range(start, stop, step)`设置步长`step`，产生一个`[start, n]`的序列  
    > * 举例  
    ```javascript
    // 产生[n, m]内的数组
    range(1, 11); // =>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    // 指定步长
    range(1, 11, 2); // => [1, 3, 5, 7, 9]
    
    // 从[0, n]
    range(5); // => [1, 2, 3, 4]
    ```
    > * `range`函数作用：快速产生一个落在区间范围内的数组  

**3 问题库**  