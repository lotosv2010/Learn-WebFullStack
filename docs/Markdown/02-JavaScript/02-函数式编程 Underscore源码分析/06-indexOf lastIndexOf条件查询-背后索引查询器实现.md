
**1 目标**
* `createdIndexFinder`

**2 笔记**
* `createdIndexFinder`  
  **`createdIndexFinder`**
  > * `underscore`中通过内置的工厂函数`createdIndexFinder`来创建一个索引查询器  
  > * `_.indexOf`及`_.lastIndexOf`正是由该函数所创建的  
  > * `createdIndexFinder(dir, predicateFind, sortedIndex)`接受三个参数  
  >> * `dir`查询方向，`_.indexOf`是正向查询，`_.lastIndexOf`是反向查询  
  >> * `predicateFind`真值检测函数，该函数只有在查询元素不是数字(`NaN`)才使用  
  >> * `sortedIndex`有序数组的索引获得函数。如果设置了该参数，将假定数组已经有序，从而更加高效地通过针对有序数组的查询函数（比如二分查找等）来优化查询性能  

  **`_.indexOf`**
  > * `_.indexOf(array, item, sorted)`：查询`item`在`array`中第一次出现的位置  
  > * `_.indexOf`方法的创建过程中，被传递了`_.findIndex`作为元素的真值预测函数，以及`_.sortedIndex`作为当数组有序时获得索引的方式  
  ```javascript
  // 源码
  _.indexOf = createdIndexFinder(1, _.findIndex, _.sortedIndex)
  ```

  **`_.lastIndexOf`**
  > * `_.lastIndexOf(array, item, sorted)`：查询`item`在`array`中最后一次出现的位置  
  ```javascript
  // 源码
  _.lastIndexOf = createdIndexFinder(-1, _.findLastIndex)
  ```

**3 问题库**  