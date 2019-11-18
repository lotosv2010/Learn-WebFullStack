
**1 目标**
* `_.initial`与`_.flatten`
* `sass`的使用及封装
* `vue`项目优化

**2 笔记**
* `_.initial`与`_.flatten`  
  **数组定位**  
    > *  `_.initial`： `_.initial(array, n)`获得`array`的除了最后`n`个元素以为的元素  
    ```javascript
    // 源码
    _.initial = function (array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1: n)));
    }
    ```
    > * `_.rest = _.tail = _.drop`： `_.rest(array, n)`返回`array`中除了前`n`个元素外的所有元素  
    ```javascript
    // 源码
    _.rest = function (array, n, guard) {
      return slice.call(array, n == null  || guard ? 1 : n);
    }
    ```

  **摊平数组**  
    > *  `_.flatten`： `_.flatten(array, shallow)`摊平`array`，通过`shallow`指明是深摊平还是浅摊平  
    ```javascript
    // 源码
    _.flatten = function (array, shallow) {
      return flatten(array, shallow, false);
    }
    ```


  **flatten**  
    > *  `_.flatten`的逻辑由内部函数`flatten`所完成，该内部函数被多个API所使用  
    ```javascript
    // 源码
    var flatten = function (array, shallow) {
      var ret = [];
      var length = array.length;
      // ...
      return ret;
    }
    ```  
    > *  `flatten`接受两个参数：  
    >> * `array`：待摊平数组  
    >> * `shallow`：是否是浅摊平，反之为深摊平

**3 问题库**  