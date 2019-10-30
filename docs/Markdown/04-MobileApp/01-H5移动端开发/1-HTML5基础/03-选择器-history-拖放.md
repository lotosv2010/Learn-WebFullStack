**1 目标**
* HTML5选择器
* HTML5拖放
* HTML5 History

**2 笔记**
* HTML5选择器  
    **HTML5新增选择器**
    > * querySelector：根据选择器规则，返回匹配的第一个元素，没有找到则返回null  
    > * querySelectorAll：根据选择规则，返回文档中所有符合条件的元素，并且返回NodeList对象  

    **css基础选择器**
    > * 元素选择器：`div{}`  
    > * 类选择器：`.my-class{}`  
    > * id选择器：`#test{}`  
    > * 通配符选择器：`*`  
    > * 并集选择器/组合选择器：`div,.my-class,#test{}`或`div.my-class{}`或`div .my-class{}`

    **css层次选择器**
    > * 子集选择器：`div>p{color:red;}`  
    > * 兄弟选择器：`.main_span + p{color:red;}`  
    > * 后代选择器：`div p{color:red;}`  
    > * 通用选择器：`.main_span ~ p{color:red;}`

    **css动态伪类选择器**
    > * `a:link{color:red;}`  
    > * `a:hover{color:red;}`  
    > * `a:active{color:red;}`  
    > * `a:visited{color:red;}`  
    > * `a:focus{color:red;}`

    **css结构伪类选择器**
    > * 选中第一个：`p:first-child{color:red;}`  
    > * 选中最后一个：`p:last-child{color:red;}`  
    > * 选中奇数项：`p:nth-child(odd){color:red;}`  
    > * 选中偶数项：`p:nth-child(even){color:red;}`

* HTML5拖放  
    **HTML5拖放(Drag和Drop)**
    > * 定义  
    > * 使用场景  
    > * 主要事件  
    > * 必备两个事件：`dragover`和`drop`

* HTML5 History
    **HTML5 History常用方法**
    方法 | 描述
    ---- | ----|
    back | 前往上一页，等价history.go(-1)
    forward | 前往下一页，等价history.go(1)
    go | 通过当前页的相对位置从浏览器历史记录(会话记录)加载页面

    **HTML5 History定义以及新特性**
    名称 | 描述
    ---- | ----|
    pushState | 没执行一次会增加一条历史记录，浏览器在返回时，就不会返回前一个页面，并且不会刷新浏览器
    replaceState | 用来修改当前的历史记录，而不是创建一个新的历史记录，点击返回按钮照样会返回上一个页面
    onpopstate | 他是popstate在window对象上的事件，pushState或者replaceState不会触发popstate事件，只会再点击后退、前进按钮或者调用history.back()、history.forward()或者history.go()

**3 问题库**