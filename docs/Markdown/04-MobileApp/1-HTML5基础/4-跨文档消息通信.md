**1 目标**
* Watch和Computed区别
* Watch和Computed使用

**2 笔记**
* Watch和Computed区别  
    **Computed：**
    > * 事实上和 `data` 对象里的数据属性使用方式是一致的
    > * 当页面中有某些数据依赖其他数据进行变动的时候，可以使用计算属性
    > * `Computed` <mark>擅长处理的场景：一个数据受多个数据影响</mark>
    > * `Computed` <mark>缓存</mark>

    **Watch：**
    > * `Watch` 用于观察和监听页面上的Vue示例
    > * <mark>如果要在数据变化的同时，进行异步操作或是比较大的开销，`Watch` 为最佳选择</mark>
    > * `Watch`<mark>擅长处理的场景：一个数据影响多个数据</mark>

* Watch和Computed使用  

**3 问题库**