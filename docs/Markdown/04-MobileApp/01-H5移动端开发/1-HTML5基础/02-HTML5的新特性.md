**1 目标**
* HTML5新增标签  
* HTML5新增表单输入框的类型  
* HTML5新增表单输入框的属性  
* HTML5制图&Canvas  
* HTML5多媒体&Video/Audio  
* HTML5的web存储功能  
* HTML5的拖放释放功能  

**2 笔记**
* HTML5新增标签  
    **header(网站头部)**

    **nav(导航栏)**

    **section(类似div)**

    **aside(文件侧栏)**

    **article(文章/文本内容)**

    **footer(网站脚部)**  

####  
* HTML5新增表单输入框的类型  
    **type="email"(限制用户输入必须为Email类型)**

    **type="url"(限制用户输入必须为URL类型)**

    **type="date"(自动生成一个日期控件)**

    **type="number"(限制用户输入必须为数字类型)**

    **type="range"(产生一个进度条的表单)**

    **type="search"(产生一个搜索意义的表单)**

    **type="color"(产生一个颜色选择表单)**

#### 
* HTML5新增表单输入框的属性  
    **placeholder(占位文本，体验更佳)**

    **autofocus(自动获取焦点)**

    **autocomplete(提交后下一次自动补全)**

    **multiple(配合file控件实现多选)**

#### 
* HTML5制图&Canvas
    **HTML5制图**

    **Canvas**

#### 
* HTML5多媒体&Video
    **video**
    **audio**

#### 
* HTML5的web存储功能
    **会话存储**
    > * `window.sessionStorage`生命周期为关闭浏览器窗口，同一个窗口下数据可共享  

    **本地存储**
    > * `window.localStorage`永久生效，除非手动删除，可多窗口共享  

####  
* HTML5的拖放释放功能
    **定义**
    > * 拖放是HTML5常见特性，及抓取对象以后拖到另一个位置，并且任何元素都能拖放  

    **在拖动目标上回触发的时间(源对象)**
    > * `ondragstart`源对象开始拖动元素时触发  
    > * `ondrag`源对象正在拖动时触发  
    > * `ondragend`源对象完成拖动后触发  

    **在目标对象上会触发的事件**
    > * `ondragenter`目标对象进入其容器范围内时触发  
    > * `ondragover`目标对象进入源对象范围内拖动时触发  
    > * `ondragleave`源对象离开其容器范围内时触发  
    > * `ondrop`释放鼠标键时触发  

**3 问题库**