
**1 目标**
* callbacks入门与实践应用    
* 概念解读

**2 笔记**
* callbacks入门与实践应用  
  **callbacks入门与实践应用**  
    > * $.Callbacks用于管理函数队列  
    > * 通过add添加处理函数到队列当中，通过fire去执行这些处理函数  
    > * 提示：$.Callbacks是在jQuery内部使用的，如为.ajax，$.Deferred等组件提供基础功能的函数。它也可以用在类似功能的一些组件中，如自己开发的插件。
  
  **API** 
  ![API](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)  

  **Callbacks参数的特定功能** 
  ![Callbacks参数的特定功能](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)  

  **参数once** 
  ![参数once](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)  

  **参数unique** 
  ![参数unique](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)  

  **参数stopOnFalse** 
  ![参数stopOnFalse](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)  

  **参数memory** 
  ![参数memory](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%96.png)  

* 概念解读  
  **概念解读** 
  ![概念解读](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%962.png)  

  **事件驱动方案改造**
  ![事件驱动方案改造](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%963.png)  
  ![事件驱动方案改造2](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%963.png)  

  **概念解读** 
  ![概念解读](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%962.png)  
  ![概念解读2](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%962.png)  
  ![概念解读3](https://raw.githubusercontent.com/lotosv2010/Learn-WebFullStack/master/image/module-04-%E6%9E%84%E9%80%A0%E5%99%A8%E8%AE%BE%E8%AE%A1%E5%8F%8A%E6%A8%A1%E5%9D%97%E6%95%B0%E6%8D%AE%E5%88%9D%E5%A7%8B%E5%8C%962.png)  

**3 问题库**  
