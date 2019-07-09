
**1 目标**
* 了解路由搭建
* 了解路由的一些基本操作

**2 笔记**
* 了解路由搭建  
    **Vue-router**  
    > * 路由，其实就是<mark>指向</mark>的意思，也可以说是一种<mark>映射</mark>
    >> * 例： `Home`按钮 => `home`内容，`about`按钮 => `about`内容  
    > * 所以在页面上有两个部分：点击部分，点击后显示内容的部分  

    **基于`Vue-router`快速构建**  
    > * `01` 安装`Vue-router`
    > * `02` 构建页面
    > * `03` 实现一个页面路由  

* 了解路由的一些基本操作  
    **动态路由匹配**
    > * 我们经常需要把某种模式匹配到所有路由，全部映射到同一组件  
    >> * 例如：有一个User组件，对于所有ID各种不相同的用户，都要使用这个组件来渲染  
    >> * 可以在Vue-router的路由路径中使用"动态路径参数"(dynamic segment)来达到这个效果  
    ```
    const User = {
        template: `<div>User</div>`
        // template: `<div>User {{ $route.params.id}}</div>`
    }
    const router = new VueRouter({
        routes: [
            // 动态路径参数以冒号开头
            {
                path: `/user/:id`,
                component: User
            }
        ]
    })
    ```

    **编程式的导航**
    > * 使用`<router-link>`创建a标签  
    > * 借助`router`的实例方法，通过编写代码实现  
    >> * `router.push`  
    >> * `router.replace`  
    >> * `router.go`  
    ```
    // 字符串
    router.push('home')

    // 对象
    router.push({path: 'home'})

    // 命名的路由
    router.push({
        name: 'user,
        params: {
            userId: '123'
        }
    })

    // 带查询参数，变成 /register?plan=private
    router.push({
        path: 'register',
        query: {
            plan: 'private'
        }
    })
    ```

    **导航守卫**
    > * `vue-router`所提供的导守卫`(Navigation Guards)`主要来通过跳转或者取消的方式守卫导航  
    > * 有多种机会植入路由导航过程中：  
    >> * 全局的  
    >> * 单个路由独享的  
    >> * 组件级  
    > * 主要掌握：  
    >> * <mark>全局前置守卫</mark>  
    >> * <mark>全局后置钩子</mark>  
    ```
    // 全局前置守卫
    const router = new VueRouter({...})
    router.beforeEach((to, from, next) => {
        // ...
    })

    // 全局后置钩子
    router.afterEach((to, from) => {
        // ...
    })

    // 说明：
    // to: Route:即将要进入的目标路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 哟定要调用该方法来 resolve 这个钩子，执行效果依赖 next 方法的调用参数
    ```

**3 问题库**