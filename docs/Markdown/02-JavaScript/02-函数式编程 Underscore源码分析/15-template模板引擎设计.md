
**1 目标**
* 模版引擎

**2 笔记**
* 模版引擎`  
  **什么是`JavaScript`模版?**  
    > * `JavaScript`模版是将`HTML`结构从包含他们的内容中分离的方法  
    > * 给定一个模板字符串，不同于一般的字符串，该字符串存在一些规则，并且需要填充数据或者逻辑  

  **什么是使用`JavaScript`模板引擎?**  
    > * 当`JavaScript`字符串内包含`HTML`，`UI`与逻辑代码混杂在一起，阅读和维护起来非常吃力。此时你就应该考虑使用模板引擎  

* `_.template`  
  **`_.template(templateString, [settings])`**
    > * 根据传入的文本`template`及配置`settings`，生成模板。   
    ```javascript
    var compiled = _.template('hello:<%= name %>');
    compiled({name: 'max'})
    // => 'hello: max'
    ```

**3 问题库**  