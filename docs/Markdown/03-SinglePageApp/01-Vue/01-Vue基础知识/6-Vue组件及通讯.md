**1 目标**
* 熟悉组件
* 熟悉组件通讯

**2 笔记**
* 熟悉组件  
    **定义**
    > * 组件是`Vue.js`最强大的功能之一
    > * 可以扩展`HTML`元素，封装可重用代码
    > * 在较高层面上是自定义的元素，`Vue.js`的编译器为它添加特殊功能
    > * 在有些情况下也可以是原生HTML元素的形式，以`is`特性扩展  
    ![组件定义](https://cn.vuejs.org/images/components.png)

    **创建组件**
    > * 调用`Vue.extend()`,创建名为`myComp`的组件，`template`定义模板的标签，模板的内容需写在该标签下
    ```
        var myComp = Vue.extend({
            template: '<div>这是我的组件</div>'
        })
    ```  
    > * `template`标签创建，需加上`id`属性
    ```
        <template id="myComp">
            <div>这是template标签构建的组件</div>
        </template>
    ``` 
    > * `script`标签创建，需加`id`属性，同事还得加`type="text/x-template"`不执行编译里面的代码
    ```
        <script type="text/x-template" id="myComp">
            <div>这是script标签构建的组件</div>
        </script>
    ``` 

    **组件注册 — 全局**
    > * 调用`Vue.extend()`创建名为`myComp`的组件全局注册  
    ```
        Vue.component('my-comp', myComp)
    ``` 
    > * `template`及`script`标签构建的组件全局注册  
    ```
        Vue.component('my-comp', {
            template: '#myComp'
        })
    ```

    **组件注册 — 局部**
    > * 调用`Vue.extend()`创建名为`myComp`的组件局部注册(只能在注册该组件的实例中使用，一处注册，一处使用)  
    ```
        var app = new Vue({
            el: '#app',
            components: {
                'my-comp': myComp
            }
        })
    ``` 
    > * `template`及`script`标签构建的组件局部注册  
    ```
        var app = new Vue({
            el: '#app',
            components: {
                'my-comp': {
                    template: '#myComp'
                }
            }
        })
    ```

* 熟悉组件通讯  
    **组件通讯的几种类型**
    > * 组件是一个独立封闭的个体，不能直接使用外部数据
    > * 父组件到子组件 — 通过子组件`props:['属性']`
    > * 子组件到父组件 — `this.$emit('方法', ' 数据')`
    > * 非父子组件之间的通讯 — 非父子组件之间通过一个空Vue实例传递数据：`const bus = new Vue()` 

**3 问题库**