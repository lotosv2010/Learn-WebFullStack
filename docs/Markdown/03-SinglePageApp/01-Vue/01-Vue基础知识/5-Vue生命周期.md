**1 目标**
* 了解钩子函数
* 理解生命周期

**2 笔记**
* 了解钩子函数  
    **钩子函数(Hook)：在Vue中是一种事件劫持机制**
    **它会比定义的事件更早进行执行处理，而且可以让你自己去配置**
    **beforeCreate**
    > * 实例创建前状态 `el`与 `data`都为 `undefined`

    **created**
    > * 实例创建完毕状态 `el` 为 `undefined`， `data`里面已经有数据

    **beforeMount**
    > * 实例挂载前状态 `el` 为 `undefined`， `data`里面已经有数据

    **mounted**
    > * 实例挂载后状态 `el` `data`里面都有相对应的属性

    **beforeUpdate**
    > * 实例更新前状态 `data`里面的属性值改变，`el` 为 `object HTMLDivElement`

    **updated**
    > * 实例更新完成状态 `data`里面的属性值改变，`el` 为 `object HTMLDivElement`

    **beforeDestroy**
    > * 实例销毁前状态

    **destroyed**
    > * 实例销毁状态

* 理解生命周期  
![理解生命周期](https://image-static.segmentfault.com/163/552/1635524199-5aed4fb354447_articlex)
![理解生命周期](https://image-static.segmentfault.com/232/337/2323373276-5aed4f94497ae_articlex)
![理解生命周期](https://image-static.segmentfault.com/503/909/503909826-5ae29a0e8cabb_articlex)

**3 问题库**