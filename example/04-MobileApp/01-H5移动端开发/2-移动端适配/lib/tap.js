(function(window) {
  // 提供给对外的接口
  function mobileTap(selector) {
    return mobileTap.prototype._init(selector)
  }
  mobileTap.prototype = {
    _init: function(selector) {
      if(typeof selector === 'string') {
        // 查找到的元素存入原型对象
        this.ele = window.document.querySelector(selector)
        // 返回原型对象
        return this
      }
    },
    // 单击事件
    tap: function(handler) {
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchend', touchFn)

      let startTime,
          endTime;
      function touchFn(e) {
        e.preventDefault();
        switch (e.type) {
          case 'touchstart':
            startTime = new Date().getTime();
            break;
          case 'touchend':
            endTime = new Date().getTime()
            if(endTime - startTime < 500) {
              handler.call(this, e)
            }
            break;
        }
      }
    },
    // 长按事件
    longTap: function(handler) {
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchmove', touchFn)
      this.ele.addEventListener('touchend', touchFn)

      let time;
      function touchFn(e) {
        e.preventDefault();
        switch (e.type) {
          case 'touchstart':
            time = setTimeout(() => {
              handler.call(this, e)
            }, 500)
            break;
          case 'touchmove':
            clearTimeout(time);
            break;
          case 'touchend':
            clearTimeout(time);
            break;
        }
      }
    },
    // 左滑动
    slideLeft: function(handler) {
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchend', touchFn)

      let startX, startY, endX, endY;

      function touchFn(e) {
        e.preventDefault();
        let firstTouch = e.changedTouches[0]
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            console.log(startX, endX)
            if(Math.abs(endX - startX) >= Math.abs(endY - startY) && startX - endX >= 20) { // x轴必须大于Y轴移动的距离
              handler.call(this, e)
            }
            break;
        }
      }
    },
    // 右滑动
    slideRight: function(handler) {
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchend', touchFn)

      let startX, startY, endX, endY;

      function touchFn(e) {
        e.preventDefault();
        let firstTouch = e.changedTouches[0]
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            console.log(startX, endX)
            if(Math.abs(endX - startX) >= Math.abs(endY - startY) &&  endX- startX >= 20) { // x轴必须大于Y轴移动的距离
              handler.call(this, e)
            }
            break;
        }
      }
    },
    // 下滑动
    slideDown: function(handler) {
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchend', touchFn)

      let startX, startY, endX, endY;

      function touchFn(e) {
        e.preventDefault();
        let firstTouch = e.changedTouches[0]
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            console.log(startY, endY)
            if(Math.abs(endY - startY) >= Math.abs(endX - startX) &&  endY - startY >= 20) { // x轴必须大于Y轴移动的距离
              handler.call(this, e)
            }
            break;
        }
      }
    },
    // 上滑动
    slideUp: function(handler) {
      this.ele.addEventListener('touchstart', touchFn)
      this.ele.addEventListener('touchend', touchFn)

      let startX, startY, endX, endY;

      function touchFn(e) {
        e.preventDefault();
        let firstTouch = e.changedTouches[0]
        switch (e.type) {
          case 'touchstart':
            startX = firstTouch.pageX;
            startY = firstTouch.pageY;
            break;
          case 'touchend':
            endX = firstTouch.pageX;
            endY = firstTouch.pageY;
            console.log(startY, endY)
            if(Math.abs(endY - startY) >= Math.abs(endX - startX) &&  startY - endY >= 20) { // x轴必须大于Y轴移动的距离
              handler.call(this, e)
            }
            break;
        }
      }
    }
  }
  window.$ = window.mobileTap = mobileTap
})(window)