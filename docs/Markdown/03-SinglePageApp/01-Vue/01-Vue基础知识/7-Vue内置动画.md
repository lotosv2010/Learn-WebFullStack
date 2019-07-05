**1 目标**
* 熟悉Vue动画

**2 笔记**
* Vue过渡动画  
    **Vue过度动画**
    > * `Vue`在插入、更新或者移除`DOM`时，提供多种不同方式的应用过渡效果
    > * Vue提供了内置的过度封装组件，该组件用于包裹要实现过渡效果的组件
    ```
    <div id="databinding">
        <button v-on:click="show=!show">点我</button>
        <transition name="fade">
            <p v-show="show" v-bind:style="styleobj">动画实例</p>
        </transition>
    </div>
    <stript type="text/javascript>
        var vm = new Vue({
            el: '#databinding',
            data: {
                show: true,
                styleobj: {
                    fontSize: '30px',
                    color: 'red'
                }
            },
            methods:{}
        })
    </stript>
    <style>
    .fade-enter-active,.fade-leave-active {
        transition: opacity 2s;
    }
    .fade-enter,.fade-leave-to {
        opacity: 0;
    }
    </style>
    ```

    **Vue动画过程**
    ![Vue动画过程](https://cn.vuejs.org/images/transition.png)
    > * v-enter  
    > * v-enter-active  
    > * v-enter-to  
    > * v-leave  
    > * v-leave-active  
    > * v-leave-to  

    **js钩子**
    > * 钩子函数可以结合`CSS` `transitions/animations`使用，也可以单独使用  
    > * 当只用`JavaScript`过渡时，在`enter`和`leave`中必须使用done进行回调。否则，它们将被同步调用，过渡会立即完成  
    ```
    <div>
        <button v-on:click="show=!show">点我</button>
        <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:leave="leave"
            v-bind:css="false"
        >
            <p v-if="show">Vue动画实例 js 钩子</p>
        </transition>
    </div>
    <stript type="text/javascript>
        var vm = new Vue({
            el: '#databinding',
            data: {
                show: true
            },
            methods:{
                beforeEnter(el) {
                    // 定义当前实现动画的初始化位置
                    el.style.transform = 'translate(100px, 0)'
                },
                enter(el, done) {
                    // 设置一下刷新状态
                    el.offsetWidth;
                    // 设置动画的结束位置
                    el.style.transform = 'translate(0px, 0)'
                    // 手动调用一下done方法，有这个方法去决定动画是否结束了
                    // 否则动画的消失会有延迟
                    done()
                },
                leave(el, done) {
                    // 将动画的状态恢复设置
                }
            }
        })
    </stript>
    <style>
    .show {
        transition: all 2s ease;
    }
    ```

**3 问题库**