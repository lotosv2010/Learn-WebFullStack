
**1 目标**
* css引入  
* less,lass处理
* 提取css代码

**2 笔记**
* 如何引入css文件  
    **css可以通过js文件引入，但必须使用相应的loader**
    > * `css-loader`,让css可以被js正确的引入  
    > * `style-loader`,让css被引入后可以正确的以一个style便签插入页面  
    > * 两者的顺序很重要，要先进过`css-loader`处理，再由`style-loader`处理  

    **安装依赖**  
    > * `npm install css-loader --save-dev`  
    > * `npm install style-loader --save-dev`  

    **style-loader的核心配置**  
    > * `insertAt`：style标签插入在那一块区域  
    > * `insertInto`：插入制定的dom
    > * `singleton`：是否合并为一个style标签
    > * `transform`：在浏览器环境下，插入style到页面前，用js对css进行操作  

    **css-loader的核心配置**  
    > * `minimize`：是否压缩css(webpack 4 已经移除)  
    > * `module`：是否使用css模块化
    > * `alias`：css中的全局别名(webpack 4 已经移除)  

* less,lass处理  
    **less,lass**
    > * less,lass是css预处理语言，用来帮助我们更方便的写css，更方便团队合作  
    > * less,lass浏览器是无法直接识别的，需要编译成css才能被识别，所以我们用less,lass写的文件都要编译  

    **less安装依赖**
    > * `npm install less --save-dev`  
    > * `npm install less-loader --save-dev`  

    **sass安装依赖**
    > * `npm install sass-loader --save-dev`  
    > * `npm install node-sass --save-dev`  

* 提取css代码  
    **安装对应的插件**
    > * webpack 3: `npm install extract-text-webpack-plugin --save-dev`  
    > * webpack 4: `npm install extract-text-webpack-plugin@next --save-dev`  
    > * 注意需安装局部的webpack  

    **改造loader处的写法**
    > * 把use改为使用extract-text-webpack-plugin  

    **在plugin处添加**
    > * 把extract-text-webpack-plugin加入到plugin里  

    **postcss**
    > * `npm install postcss postcss-loader autoprefixer postcss-cssnext --save-dev`  

**3 问题库**