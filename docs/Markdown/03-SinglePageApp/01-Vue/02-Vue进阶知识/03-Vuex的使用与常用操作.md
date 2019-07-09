
**1 目标**
* 了解`Vuex`
* 了解`Vuex`的一些基本操作

**2 笔记**
* 了解`Vuex`  
    **官方说法**  
    > * `Vuex`是一个专门`Vue.js`应用程序开发的状态管理模式  
    > * 它采用集中式存储管理应用的所有组件的状态，并以相应的规则，保证状态以一种可预测的方式发生变化  

    **个人理解**  
    > * `Vuex`是用来管理组件之间通信的一个插件

* 基于`Vuex`快速构建  
    **步骤**  
    > * `01` 安装Vuex  
    > * `02` 构建页面
    > * `03` 实现一个`demo`  

* `Vuex`  
    **`store`子对象**
    > * `state`: 用于存储数据，类似`vue`实例的`data`属性  
    > * `mutations`: 唯一修改`state`的方法，修改过程是同步的  
    > * `actions`: 发出事件，事件监听程序一般会调用`mutations`对`state`进行修改，`action`事件本身是异步的
    > * `getters`: 用于对`state`的数据进行筛选，过滤  
    ```
    const store = new Vuex.Store ({
        state: {
            // 存放组件之间共享的数据
            name: 'store',
            age: '18'
        },
        mutations: {
            // mutations方法必须是同步方法
            // 显示的更改state里面的数据
            change(state, val) {
                state.age += val
            }
        },
        getters: {
            // 获取数据的方法
            getAge(state) {
                return state.age
            }
        },
        actions: {
            // 异步处理
            add(context, val) {
                setTimeout(() => {
                    // 提交事件
                    context.commit('change', val)
                })
            }
        }
    })

    Vue.component('demo', {
        template: `
                    <div>
                        <p @click='changeAge'>姓名： {{ name }}  年龄：{{ age }}</p>
                        <button @click='changeAgeAsync'>change</button>
                    </div>
                    `,
        computed: {
            name() {
                return this.$store.state.name
            },
            age() {
                return this.$store.state.age
            }
        },
        methods: {
            changeAge() {
                // 在组件里提交
                this.$store.commit('change', 10)
            },
            changeAgeAsync() {
                // 在组件里派发事件 changeAgeAsync-->
                // actions里的add函数被触发-->mutations里的change函数触发
                this.$store.dispatch('add', 1)
            }
        }
    })
    ```

**3 问题库**