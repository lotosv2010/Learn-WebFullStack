**1 目标**
* 事件绑定格式
* 事件修饰符
* 事件委托

**2 笔记**
* 事件绑定格式  
    **使用：**
    > * `<v-on:事件名 = 函数名>` 或 `<@事件名 = 函数名>`

* 事件修饰符  
    **.stop：**
    > * 阻止单击事件冒泡(`event.preventDefault`)

    **.prevent：**
    > * 提交事件不再重载页面(`event.stopPropagation`)

    **.capture：**
    > * 添加事件侦听器时使用事件捕获模式，先走捕获 => 冒泡

    **.self：**
    > * 只当事件在该元素本事(而不是子元素)触发时触发回调

    **.once：**
    > * 只触发一次

* 按键修饰符  
    **.enter、.tab、.delete、.esc、.space、.up、.down、.left、.right**

* 事件委托
    > * 事件绑定到父元素, <mark>如下代码：</mark>
    ```
    // 使用事件代理
    <ul @click="change($event)">
        <li v-for="item in menus" :mark="item.mark">{{ item.des }}</li>
    </ul>

    // 不使用事件代理
    <ul>
        <li v-for="item in menus" :mark="item.mark" @click="change($event)">{{ item.des }}</li>
    </ul>
    ```

**3 问题库**