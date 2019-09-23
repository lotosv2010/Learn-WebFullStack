
**1 目标**
* HTML的生成  
* React生态
* 代码规范

**2 笔记**
* HTML的生成  
    **需要用到的plugin**
    > * `npm install html-webpack-plugin --save-dev`  

    **相关配置**  
    > * `filename`：打包生成的html文件的名字  
    > * `template`：指定一个html文件为模板  
    > * `minify`：压缩html  
    > * `inject`：是否把js，css文件插入到html，插入到哪  
    > * `chunks`：多入口时，指定引入的chunks  

* React生态  
    **awesome-react**
    > * 脚手架  
    > * 可视化  
    > * 数据管理  
    > * 各类UI组件库  
    > * 企业级解决方案  

    **UI组件库**
    > * ant-d  
    > * element  
    > * material  

* 代码规范  
    **standard.js规范**
    > * `npm install standard --save-dev`  
    > * `npm install snazzy --save-dev`  
    > * 配置package.json,添加一条名为lint的`npm script "scripts"`: `{ "lint": "standard --varbose | snazzy" }`  
    > * 使用编辑器插件，实时检查代码规范  
    > * `git pre-commit`钩子，在每次commit之前检查代码规范  

    **bem css规范**
    > * `.person{}`  
    > * `.person__hand{}`  
    > * `.person--female{}`  
    > * `.person--female__hand{}`  
    > * `.person__hand--left{}`  

**3 问题库**