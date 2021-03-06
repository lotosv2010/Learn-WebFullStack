
**1 目标**
* 理解实例生命周期钩子

**2 笔记**
* 理解实例生命周期钩子  
    > * 每个`Vue`实例再被创建时都要经过一系列的初始化过程——例如，**需要设置数据监听、编译模板、将实例挂载到`DOM`并在数据变化时更新`DOM`** 等。同事在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。  
    > * 比如`created`钩子可以用来在一个实例被创建之后执行代码，也有一些其他的钩子，在实例生命周期的不同阶段被调用，如`mounted`、`updated`和`destroyed`。生命周期钩子的`this`上下文指向调用它的`Vue`实例。 

    **生命周期示意图：**
    ![生命周期示意图](https://cn.vuejs.org/images/lifecycle.png)


**3 问题库**
* Vue实例化过程
* 子组件实例化过程