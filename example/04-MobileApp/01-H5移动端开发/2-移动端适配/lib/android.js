(function(window) {
  window.gesture = function(ele, callback) {
    let isStart = false;

    ele.addEventListener('touchstart', function(event) {
      if(event.touches.length >= 2) {
        isStart = true;
        // 记录两个触点的初始距离
        this.startDistance = getDistance(event.touches[0], event.touches[1]);
        // 记录两个触点的初始角度
        this.startDeg = getDeg(event.touches[0], event.touches[1]);
        // 判断是否传入回调，调用回调
        if(callback && typeof callback['start'] === 'function') {
          // 传回event
          callback['start'](event);
        }
      }
    })

    ele.addEventListener('touchmove', function(event) {
      // 判断触点个数
      if(event.touches.length >= 2) {
        // 记录两个触点的实时距离
        var currentDistance = getDistance(event.touches[0], event.touches[1]);
        // 记录两个触点的实时角度
        var currentDeg = getDeg(event.touches[0], event.touches[1]);
        // 记录实时距离与初始距离的比例，传入到event属性
        event.scale = currentDistance / this.startDistance;
         // 记录实时角度与初始角度的差值，传入到event属性
        event.rotation = currentDeg - this.startDeg;
         // 判断是否传入回调，调用回调
        if(callback && typeof callback['change'] === 'function') {
          // 传回event
          callback['change'](event);
        }
      }
    })

    ele.addEventListener('touchend', function(event) {
      // 判断是否执行了多指操作并且离开
      if(isStart && event.touches.length < 2) {
         // 判断是否传入回调，调用回调
        if(callback && typeof callback['end'] === 'function') {
          // 传回event
          callback['end'](event);
        }
        // 重置阈值
        isStart = false
      }
    })

    // 得到两点的距离
    function getDistance(touch1, touch2) {
      const a = touch1.clickX - touch2.clickX;
      const b = touch1.clickY - touch2.clickY;
      // 勾股定理，求两点距离
      return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    }

    // 获取角度
    function getDeg(touch1, touch2) {
      const x = touch1.clickX - touch2.clickX;
      const y = touch1.clickY - touch2.clickY;
      // 勾股定理，求两点距离
      const radian = Math.atan2(y, x);
      return radian * 180 / Math.PI;
    }
  }
})(window)