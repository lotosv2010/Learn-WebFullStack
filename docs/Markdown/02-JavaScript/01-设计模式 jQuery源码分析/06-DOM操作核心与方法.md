
**1 目标**
* html-text-css作用  
* 揭秘样式操作css方法源码解析  
* addClass()源码分析  
* DOM操作核心-domManip-buildFragment  

**2 笔记**
* html-text-css作用  
  **html-text-css作用**
  > * html(): 用为读取和修改元素的HTML标签  
  > * text(): 用来读取或修改元素的纯文本内容  
  > * css(): 设置或返回被选元素的一个或多个样式属性  
  > * 说明: text(),html().css()都是通过jQuery.access提供底层支持。jQuery.access()是一个多功能方法，作为set和get值来使用  

* 揭秘样式操作css方法源码解析  
  **基础回顾**
  > * HTML样式定义：<link/>外部引入、<style/>嵌入、HTML DOM style对象  
  > * 样式规则：内部属性名都是采用驼峰形式、保留关键字float换成cssFloat，IE：styleFloat
  > * 合并CSSText：`Element.style.cssText = 'width:200px;height:10px;display:block;'`  
  > * 样式访问： DOM中getComputedStyle该方法返回包含元素的所有css属性的对象。通过对象提供的api或通过css属性的名称来访问各个css属性的值。IE678中则用currentStyle代替

  **css源码解析**
  > * css():方法设置或返回被选元素的一个或多个样式属性  
  > * 返回css属性语法:css('propertyname')  
  > * 设置css属性语法:css('propertyname', 'value')  
  > * 设置等多个css属性语法:css({propertyname': 'value', propertyname': 'value'})

* addClass()源码分析  
  **addClass()源码分析**
  > * addClass():对元素的样式操作，底层的实现修改元素的className值  
  > * 实现的功能:增加一天样式规则:addClass('box'),增加多条样式规则:.addClass('box item')

* DOM操作核心-domManip-buildFragment  
  **domManip**
  > * domManip:可谓元老级工具函数，从jQuery 1.0版本开始便存在，一直到最新的jQuery版本  
  > * domManip:主要功能是为了实现DOM的插入和替换，具体共为5个函数服务  
  >> * append():在元素的结尾(任然在内部)插入指定内容  
  >> * prepend():在元素开始的地方插入内容  
  >> * before():根after相反，在元素前面插入内容  
  >> * after():在被选元素之后插入内容  
  >> * replaceWith():替换元素  

  **domManip实现**
  > * domManip完成两件事  
  >> * DOM节点添加  
  >> * 检测DOM节点内有script标签，特殊处理  

  > * domManip内对script做的特殊处理  
  >> * script无type属性，默认会执行其内的的JavaScript脚本  
  >> * script如果有src属性，会调用$._evalUrl请求JavaScript文件并执行  
  >> * script的type="text/javascript"会执行其内的JavaScript脚本，其他不会执行  
  >> * 说明：domManip依赖的一个重要函数就是buildFragment，为DOM插入提高挺能  

  **buildFragment作用**
  > * buildFragment:这个方法用来构建一个包含子节点fragment对象，主要在domManip和jQuery.parseHTML中使用  
  > * 依赖关系:  
  >> * buildFragment：  
  >>> *  domManip: append/prepend/before/after/replaceWith  
  >>> *  jQuery.parseHTML: load/init  

**3 问题库**  