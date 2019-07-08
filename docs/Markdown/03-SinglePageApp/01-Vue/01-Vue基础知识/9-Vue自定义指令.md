**1 目标**
* 熟悉自定义指令

**2 笔记**
* 自定义指令  
    **概念**
    > * 除了内置指令(`v-for/v-if/v-else/v-else-if/v-model/v-bind/v-on/v-show/v-html/v-text...`),`Vue.js`也允许注册自定义指令
    > * 自定义指令提供一种机制将数据的变化映射为`DOM`行为
    > * 可以用`Vue.directive(id, definition)`方法注册一个全局自定义指令，它接收两个参数指令`ID`与定义对象，也可以用组件的`directives`选项注册一个局部自定义指令

    **使用 — 钩子函数**
    > * **`bind`**：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
    > * **`inserted`**：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
    > * **`update`**：所在组件的 `VNode` 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    > * **`componentUpdated`**：指令所在组件的 `VNode` 及其子 VNode 全部更新后调用
    > * **`unbind`**：只调用一次，指令与元素解绑时调用
    ```
    // 定义
    Vue.directive('my-directive', {
        bind: function(el, binding, vnode) {
            // 准备工作
            // 例如，添加事件处理器或只需要运行一次的高耗任务
        },
        update: function (el, binding, vnode, oldVnode) {
            // 值更新时的工作
            // 也会以初始值为参数调用一次
        },
        unbind: function(el, binding, vnode) {
            // 清理工作
            // 例如，删除bind()添加的事件监听器
        }
    })
    // 使用
    <div v-my-directive="someValue"></div>
    ```

    **使用 — 指令实例属性**
    > * **`el`**：指令所绑定的元素，可以用来直接操作 `DOM`
    > * **`binding`**: 一个对象，包含以下属性：
        >> * **`name`**：指令名，不包括 `v-` 前缀
        >> * **`value`**：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`
        >> * **`oldValue`**：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用
        >> * **`expression`**：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`
        >> * **`arg`**：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`
        >> * **`modifiers`**：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
    > * **`vnode`**：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情
    > * **`oldVnode`**：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用
    ```
    Vue.directive('demo', {
        bind: function (el, binding, vnode) {
            var s = JSON.stringify
            el.innerHTML =
            'name: '       + s(binding.name) + '<br>' +
            'value: '      + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: '   + s(binding.arg) + '<br>' +
            'modifiers: '  + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ')
        }
    })

    new Vue({
        el: '#hook-arguments-example',
        data: {
            message: 'hello!'
        }
    })
    ```

**3 问题库**