**1 目标**
* canvas

**2 笔记**
* canvas的概念  
    **定义**
    > * `<canvas>`最早由Apple引入webkit，用于Mac OS X的Dashboard，随后被各个浏览器实现。如今，所有的主流的浏览器都支持它。它是一个可以使用JS脚本来绘制图形的HTML元素，我们通常可以理解为是一块嵌入在页面中的一块画布

    **使用场景**
    > * 我们可以使用`<canvas>`提供的脚本API绘制丰富的图表、制作图片构图或者制作简单的动画  

* canvas学习模块规划
    **基础API和用法**
    > * 兼容性内容替换以及标准的模板骨架，以及基础的形状绘制  

    **样式与颜色**
    > * 文本和图片绘制；fill(填充)和stroke(描边)包括线样式以及透明度和渐变的使用  

    **曲线和高级路径**
    > * 圆弧和曲线包括二次、三次贝塞尔曲线path2D对象的使用和SVG paths的学习  

    **状态、变形以及动画**
    > * 状态的保存和恢复；各种变形(移动、旋转等)，路径的裁剪以及动画实现步骤  

* 基础API和用法
    **兼容性内容替换**
    ```html
        <canvas id="canvas" width="150" height="150">
            <!--当然也可以替换任意的文本或者HTML代码-->
            <img scr="images/unsupport.png" width="150" height="150" alt="">
        </canvas>
    ```  

    **canvas2d模板骨架**
    ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Canvas</title>
        <script type="text/javascript">
            function draw() {
            var canvas = document.getElementById('test')
            if(canvas.getContext) {
                var ctx = canvas.getContext('2d')
            }
            }
        </script>
        </head>
        <body onload="draw()">
        <canvas id="test" width="150" height="150">
            您的浏览器暂不支持canvas
        </canvas>
        </body>
        </html>
    ```

    **canvas2d形状绘制**
    > * 矩形(Rectangular)：无论是绘制实心矩形还是清除矩形区域，四个参数分别是x，y，width，height  
    ```javascript
        var ctx = canvas.getContext('2d)
        ctx.fillRect(25,25,100,100) // 实心矩形
        ctx.clearRect(45,45,60,60) // 清除矩形区域
        ctx.strokeRect(50,50,50,50) // 空心矩形
    ```

    > * 圆弧：x，y为圆心点的以radius为半径的圆弧(圆)，从startAngle开始到endAngle结束来生成  
    ```javascript
       /*x,y,radius,startAngle,endAngle,anticlockwise
       * 参数anticlockwise为一个布尔值，为true时，是逆时针方向，
       * 否则为顺时针方向（默认顺时针方向） */
       ctx.arc(75,75,50,0,2*Math.PI,true)
       ctx.stroke()
    ```

    > * 路径(paths)：圆形的基本元素是路径。路径通过不同颜色和宽度的线段或曲线相连成的不同形状的点的集合  
    ```javascript
       ctx.beginPath() // 开始路径
       ctx.moveTo(75,50) // 画笔移动到点75,50
       ctx.lineTo(100,75) // 从上一个点往100,75绘制直线
       ctx.lineTO(45,125) // 再从上一个点往45,125绘制直线
       cxt.stroke()
    ```

* 样式与颜色
    **canvas2d色彩(colors)**
    > * 填充样式(fillStyle)：如果想要给图形上色，有两个重要的属性可以做到：fillStyle和strokeStyle  
    ```javascript
       /* 设置填充色，按照设置的颜色绘制一个实心矩形*/
       ctx.fillStyle = '#FD0'
       ctx.fillRect(0,0,75,57)
    ```

     > * 轮廓样式(strokeStyle)：fillStyle用于填充颜色，strokeStyle用于描边颜色的设置，只要符合W3C的颜色格式都支持  
    ```javascript
       /* 绘制一个圆形的轮廓*/
       ctx.strokeStyle = 'rgb(0, 255, 255)'
       ctx.beginPath()
       ctx.arc(50, 50,10,0,Math*PI*2,true)
       ctx.stroke()
    ```

     > * 透明度(transparency)：除了可以绘制实色图形，我们还可以用canvas的globalAlpha来绘制半透明的图形  
    ```javascript
       /* 设置填充色，按照设置的颜色绘制一个实心矩形*/
       ctx.fillStyle = 'rgb(0, 255, 255)'
       ctx.globalAlpha = 0.2 // 设置透明度
       ctx.fillRect(0,0,75,75)
    ```

     > * 渐变色(gradients)：就好像一般的绘制软件一样，我们可以用线性或者径向的渐变来填充或描边  
    ```javascript
       var linearGradient = ctx.createLinearGradient(0,0,150,150)
        var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100)
        linearGradient.addColorStop(0, 'white')
        linearGradient.addColorStop(1, 'black')
        ctx.fillStyle = linearGradient
        ctx.fillRect(25,25,100,100)

        radialgradient.addColorStop(0, 'white')
        radialgradient.addColorStop(1, 'black')
        ctx.fillStyle = radialgradient
        ctx.arc(75,75,50,0,2*Math.PI,true)
        ctx.fill()
    ```

     > * 线条宽度  
    ```javascript
       ctx.lineWidth = value // value为整数
    ```

     > * 线条末端样式  
    ```javascript
      ctx.lineCap = type
      var lineCap = ['butt', 'round', 'square']
    ```

     > * 线条与线条间接合处的样式  
    ```javascript
      ctx.lineJoin = type
      var lineJoin = ['butt', 'bevel', 'miter']
    ```

     > * 虚线样式  
    ```javascript
      ctx.setLineDash(segments)
      ctx.lineDashOffset = value
      ctx.getLineDash()
      // segments通常是一个数组，value是个整数
    ```

* 曲线和高级路径
    **贝塞尔曲线**
    > * 二次及三次贝塞尔曲线都是十分有用，一般用来绘制复杂有规律的图形  
    >> * `quadraticCurveTo(cp1x, cp1y, x, y)`：绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x，y为结束点  
    >> * `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`：绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x，y为结束点  
    ```javascript
        // 二次贝塞尔曲线
        ctx.beginPath()
        ctx.moveTo(0, 150) // 移动到开始点0,150
        ctx.quadraticCurveTo(75, 0, 150, 150) // 控制点75,0;结束点150,150
        ctx.stroke() // 绘制

        // 三次贝塞尔曲线
        ctx.beginPath()
        ctx.moveTo(0, 100) // 移动到开始点0,100
        ctx.bezierCurveTo(50, 50, 100, 150, 150, 100) // 控制点一50,50;控制点二100,150；结束点150,100
        ctx.stroke() // 绘制
    ```

    **高级路径之Path2D**
    > * Path2D对象用来缓存或记录绘画命令，以便快速的回顾路径  
    ```javascript
        var circle = new Path2D()
        circle.moveTo(125, 35)
        circle.arc(100, 35, 25, 0, 2 * Math.PI)
        ctx.fill(circle)
    ```

    **高级路径之SVG Paths**
    > * Path2D API有另一个强大的特点——使用SVG path data来初始化canvas上的路径  
    ```javascript
        var p = new Path2D('M10 10 h 80 v 80 h -80 Z')
        ctx.fill(p)
        /* 这条路径将
        * 先移动到点(M10 10),
        * 然后在水平移动80个单位(h 80),
        * 然后下移80个单位(v 80),
        * 接着左移80个单位(h -80),
        * 再回到起点(z)
        * 关于svg data的语法和理解，可以参考第三方文档和资料
        */
    ```

* 状态、变形以及动画
    **canvas的状态控制**
    > * 在了解变形前，先介绍2个开始绘制复杂图形时必不可少的方法  
    >> * save():保存画布的所有状态，canvas的状态就是当前画面应用的所有样式和变形的一个快照  
    >> * restore():save和restore方法是用来保存和恢复canvas状态，都没有参数  
    ```javascript
        /* canvas状态存储在栈中，
        * 每当save()方法被调用后，当前的状态就被推送到栈中保存。
        * 一个绘画状态包括：
        *   1.当前应用的变形(即移动、旋转和缩放)
        *   2.strokeStyle，fillStyle，globalAlpha，lineWidth，lineCap，lineJoin，miterLimit等等属性的值
        *   3.当前的裁切路径(clipping path)
        * 你可以调用任意多次save方法
        * 关每一次调用restore方法，上一个保存的状态就从栈中弹出，所有设定都恢复
        */
    ```

    **变形**
    > * 移动(Translating)  
    ```javascript
        translate(x, y)
        // translate方法接收两个参数，x是左右移动，y是上下移动
    ```

    > * 缩放(Scaling)  
    ```javascript
        scale(x, y)
        // 参数都是实数，可为负数，
        // x为水平缩放，
        // y为垂直缩放，
        // 如果比1小，会等比缩放图形，
        // 如果比1大会放大图形，
        // 默认值为1
    ```

    > * 旋转(Rotating)  
    ```javascript
        rotate(angle)
        // 这个方法只接受一个参数：
        // angle旋转的角度，
        // 它是顺时针方向的，
        // 以弧度为单位的值
    ```

    > * 变形(Transforms)  
    ```javascript
        transform(m11, m12, m21, m22, dx, dy)
        // 这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵
    ```

    > * 实例  
    ```javascript
        // 变形
        var canvas = document.getElementById('test')
        var ctx = canvas.getContext('2d')
        ctx.lineWidth = '10'
        ctx.strokeStyle = '#fe9901'
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(30/ 180 * Math.PI)
        ctx.beginPath()
        ctx.moveTo(0, -180)
        ctx.lineTo(0, -200)
        ctx.stroke()

        ctx.rotate(30 / 180 * Math.PI)
        ctx.beginPath()
        ctx.moveTo(0, -140)
        ctx.lineTo(0, -160)
        ctx.stroke()
        ctx.save()
        ctx.rotate(30 / 180 * Math.PI)
        ctx.beginPath()
        ctx.moveTo(0, -180)
        ctx.lineTo(0, -200)
        ctx.stroke()

        ctx.rotate(30 / 180 * Math.PI)
        ctx.beginPath()
        ctx.moveTo(0, -140)
        ctx.lineTo(0, -160)
        ctx.stroke()
    ```

**3 问题库**
* 动画的实现步骤  
> * 1.清空canvas：除非接下来要画的内容会完全充满canvas，否则需要清空所有。最简单的做法就是用`clearRect`方法  
> * 2.保存canvas状态：如果需要改变一些会改变canvas状态的设置(样式，变形之类的)，又要在没画一帧之时都是原始状态的话，需要先保存一下。  
> * 3.绘制动画原型(animated shapes)：这一步才是重绘画针  
> * 4.恢复canvas状态：如果已经保存了canvas的状态，可以先恢复它，然后重绘下一帧  