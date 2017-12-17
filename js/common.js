// 封装touch触摸的各种方法
var touch = {
  // 封装点击方法
  tap: function (dom, callback) {
    // 声明一个触摸的开始时间，开始位置。
    var startTime, startX, startY;
    
    dom.addEventListener("touchstart", function (e) {
      // 如果触摸的手机超过一个，跳出函数
      if (e.targetTouches.length > 1) {
        return;
      }
      // 记录触摸的开始时间，开始位置。
      startTime = Date.now();
      startX = e.targetTouches[0].clientX;
      startY = e.targetTouches[0].clientY;
    });

    dom.addEventListener("touchend", function (e) {
      // 如果离开屏幕的手指大于1，跳出函数
      if (e.changedTouches.length > 1) {
        return;
      }
      // 如果离开屏幕时减去触摸时的时间超过300毫秒，跳出函数
      if (Date.now() - startTime > 300) {
        return;
      }
      // 声明结束位置
      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      // 允许触摸与离开屏幕时移动的距离小于6
      if (endX - startX < 6 && endY - startY < 6) {
        callback && callback(e);
      }
    });
  }
};