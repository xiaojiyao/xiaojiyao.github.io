window.onload = function () {
  // 获取元素
  var list = document.querySelector(".jd_left");
  var ul = list.querySelector("ul");
  var lis = ul.querySelectorAll("li");
  // 获取显示导航列表盒子的高以及存着导航列表的ul的高
  var listH = list.offsetHeight;
  var ulH = ul.offsetHeight;

  // 声明需要用到的坐标变量
  var startY = 0, moveY = 0, distantY = 0;
  // 声明一个当前位置变量
  var currentY = 0;
  // 声明弹性区间
  var bounce = 100;
  // 声明ul的Y轴移动距离在静止时的最大，最小值，以及ul在有弹性时的最大，最小值
  var maxY = 0;
  var minY = listH - ulH;
  var maxBounceY = maxY + bounce;
  var minBounceY = minY - bounce;
  // 注册触摸事件，实现滑动功能
  list.addEventListener("touchstart", function (e) {
    startY = e.targetTouches[0].clientY;
  });
  list.addEventListener("touchmove", function (e) {
    moveY = e.targetTouches[0].clientY;
    distantY = moveY - startY;
    // 如果当前位置加上本次移动的距离超过ul最大弹性值或者小于最小值，就跳出函数
    if (currentY + distantY > maxBounceY || currentY + distantY < minBounceY) {
      return;
    }
    // 如果ul的Y轴移动距离超出最大或最小值会回弹，加上过渡效果，所以这里要去掉过渡效果
    ul.style.transition = "none";
    ul.style.top = distantY + currentY + "px";
  });
  list.addEventListener("touchend", function (e) {
    // 如果ul的Y轴移动距离的最大值，就回到最大值的位置超出最大或最小值会回弹，加上过渡效果
    ul.style.transition = "top 0.5s";
    // 如果当前位置加上本次移动距离超过了ul的Y轴移动距离的最大值，就回到最大值的位置
    if (currentY + distantY > maxY) {
      ul.style.top = maxY + "px";
      // 如果当前位置加上本次移动距离超过了ul的Y轴移动距离的最小值，就回到最小值的位置
    } else if (currentY + distantY < minY) {
      ul.style.top = minY + "px";
    } else {
      // 如果当前位置加上本次移动距离在ul的Y轴移动距离的合理区间，把移动过的距离累加到当前位置变量
      currentY += distantY;
    }
    // 每次手指离开屏幕，清除本次记录的移动距离，以免干扰下次计算
    startY = 0;
    moveY = 0;
    distantY = 0;
  });
  // 为了点击时能找到当前索引，给每个li加个索引值
  for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
  }
  // 使用封装好的点击方法
  touch.tap(ul, function (e) {
    // 先把所有的li点击样式去掉
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove("active");
    }
    // 因为e.target得到的是a标签，active给li才有效果，所以先拿到e.target的父元素
    var currentLi = e.target.parentNode;
    // 给点击的当前索引加active类名以高亮
    currentLi.classList.add("active");

    var liH = currentLi.offsetHeight;
    ul.style.transition = "top 0.5s";

    // 如果点击时整个ul移动的距离小于ul的Y轴移动距离的最小值，就强制回到最小值
    if (- (liH * currentLi.index) < minY) {
      ul.style.top = minY + "px";
      currentY = minY;
    } else {
      // 点击时让当前li显示在list盒子的顶部
      ul.style.top = - (liH * currentLi.index) + "px";
      currentY = - (liH * currentLi.index);
    }
  });
}