**1 目标**
* 理解模板编译
* 理解渲染函数

**2 笔记**
* [全局概览](https://www.jianshu.com/p/5fdb4c536071) 
    ![全局概览](https://upload-images.jianshu.io/upload_images/12812588-713fcf2ad4d242ea.png?imageMogr2/auto-orient/)

* 编译  
    * `compile`编译可以分成 **`parse`**、 **`optimize`** 与 **`generate`** 三个阶段，最终需要得到`render function`。  
      * **`parase`**：会用正则等方式解析template模板中的指令、`class`、`style`等数据，形成AST。 
      * **`optimize`**：主要作用是标记`static`静态节点。
      * **`generate`**：是将AST转化成`render function`字符串的过程，得到结果是`render`的字符串以及`staticRenderFns`字符串 

      经过`parse`、`optimize`与`generate`这三个阶段以后，组件中就会存在渲染`VNode`所需的`render function`了


**3 问题库**
* 编译的三个阶段的理解