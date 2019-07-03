# Learn-WebFullStack
## 一、说明：
## 1.主要用来记录学习和研究web全栈的学习笔记及知识点


## 二、每小结知识点总结
## 01.JavaScript
***

## 02.单页面应用开发
> **01 vue** > **基础知识** > **vue思想**

**1 目标**
* 数据驱动
* 组件化思想

**2 笔记**
* 数据驱动
    **双向绑定**
* 组件化思想
    **定义：**
    > * 组件(Component)是vue.js最强大的功能之一  
    > * 组件可以扩展HTML元素，封装可重用代码  
    > * 组件是自定义元素，VUe.js的编译器为她添加特殊功能  
    > * 组件也可以扩展原生的HTML元素  

    **功能：**
    > * 能够把页面抽象成相对独立的模块  
    > * 实现代码重用，提高开发效率和代码质量，使得代码易于维护

**3 问题库**

> **01 vue** > **基础知识** > **vue内部运行机制**

**1 目标**
* Vue内部运行机制

**2 笔记**
* Vue内部运行机制流程图
    **初始化与挂载：**
    > * 在 `new Vue()`之后，Vue会调用 `_init` 函数惊醒初始化，初始化生命周期、事件、`props`、`methods`、`data`、`computed`与`watch`等  
    > * 其中最重要的是通过 `Object.defineProperty` 设置 `setter` 与 `getter` 函数，用来实现"响应式"以及"依赖收集"
    > * 初始化之后，调用$mount会挂载组件

    **编译三部曲：**
    > * `Parse`(解析)：利用正则将模板转换成抽象语法树(AST)  
    > * `optimize`(标记静态节点做优化)：标记静态节点，以后`update`的时候，`diff`算法可以跳过静态节点
    > * `generate`(转成字符串)：将抽象语法树(AST)转成字符串，供`render`去渲染DOM

    **响应式：**
    > * 利用 `Object.defineProperty` 设置 `data` 所返回对象，进行 `render function` 渲染时，读取 `data` 对象数据，出发 `getter` 函数
    > * 对 `data` 中的属性进行依赖收集，放到观察者(`watcher`)观察队列中
    > * 修改 `data` 内属性会触发 `setter` 函数，通知观察者数据变化，观察者调用 `update` 更新试图

    **虚拟DOM：**
    > * `Render function` 会被转换成虚拟 `DOM` — 实际是一个js对象，从顶层 `DOM` 层层描述 `DOM`，有 `tag`，`children`，`isStatic`(代表是否为静态节点)，`isComment`(代表是否为注释节点)等等许多属性来做DOM描述

    **更新视图：**
    > * 数据变化后，执行 `render function` 可以得到一个新的 `VNode` 节点  
    > * 得到新视图最简单粗暴的方法：直接解析新 `VNode` 节点，用 `innerHTML` 全部渲染到真实的`DOM`中
    > * `update`时，执行 `patch`，传入新旧 `VNode`，通过 `diff` 算法算出差异，局部更新视图，做到最优化

**3 问题库**
***