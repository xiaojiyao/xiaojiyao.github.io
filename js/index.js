window.onload = function () {

  // 调用头部搜索框透明函数
  bannerTransparent();

  // 调用秒杀倒计时函数
  secondKill();

  // 调用动态修改轮播图结构函数
  changeBanner();

  // 调用轮播图播放函数
  bannerPlay();
}

// 头部搜索框透明封装
function bannerTransparent() {
  // 获取头部搜索框
  var header = document.querySelector("header");
  // 获取轮播图banner块
  var banner = document.querySelector(".jd_banner");
  // 获取轮播图高度
  var bannerH = banner.offsetHeight;
  // 定义初始背景透明度值
  var opacity = 0;
  window.addEventListener("scroll", function () {
    var scrollH = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollH < bannerH) {
      opacity = scrollH / bannerH;
    } else {
      opacity = 1;
    }
    header.style.backgroundColor = "rgba(31, 39, 136," + opacity + ")";
  });
}

// 秒杀倒计时封装
function secondKill() {
  // 定义一个总时间(以秒为单位)
  var total = 3333;
  // 获取用来显示时间的所有li
  var lis = document.querySelectorAll(".jd_secondKill .p_title .title_left ul li");
  var timeId = setInterval(function () {
    // 分别计算时分秒
    var hour = Math.floor(total / 360);
    var minute = Math.floor(total / 60);
    var second = total % 60;
    // 每秒让总数减一，倒计时
    total--;
    // 将计算好的时分秒设置到相应的li里面
    lis[0].innerHTML = Math.floor(hour / 10);
    lis[1].innerHTML = Math.floor(hour % 10);
    lis[3].innerHTML = Math.floor(minute / 10);
    lis[4].innerHTML = Math.floor(minute % 10);
    lis[6].innerHTML = Math.floor(second / 10);
    lis[7].innerHTML = Math.floor(second % 10);
    // 总数小于0，倒计时结束，停止定时器，跳出函数
    if (total < 0) {
      clearInterval(timeId);
      return;
    }
  }, 1000);

}

// 动态修改轮播图结构封装
function changeBanner() {
  // 获取显示轮播图的banner
  var banner = document.querySelector(".jd_banner");
  // 获取banner宽度
  var bannerW = banner.offsetWidth;
  // 获取装着所有图片的ul
  var imgBox = banner.querySelector(".imgBox");
  // 获取轮播图中的第一张以及最后一张图片
  var first = imgBox.querySelector("li:first-of-type");
  var last = imgBox.querySelector("li:last-of-type");
  // 将第一张图片添加到ul的子元素最后面
  imgBox.appendChild(first.cloneNode(true));
  // 将最后一张图片添加到ul的子元素最前面
  imgBox.insertBefore(last.cloneNode(true), imgBox.firstElementChild);
  // 获取所有要轮播的图片的盒子li
  var lis = banner.querySelectorAll(".imgBox li");
  // 设置ul的宽度
  imgBox.style.width = lis.length * bannerW + "px";
  // 设置li的宽度
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.width = bannerW + "px";
  }

  // 设置ul偏移量使banner显示应该轮播的第一张图
  imgBox.style.left = -bannerW + "px";

  // 轮播图自适应屏幕大小
  // window.addEventListener("resize",function () {
  //   bannerW = screen.width;
  //   var totalW = lis.length * bannerW;
  //   imgBox.style.width = totalW + "px";
  //   var allLi = imgBox.querySelectorAll("li");
  //   for (var i = 0; i < allLi.length; i++) {
  //     allLi[i].style.width = bannerW + "px";
  //   }
  //   imgBox.style.transform = "translateX("+(- bannerW)+"px)";
  // });
}

// 轮播图播放
function bannerPlay() {
  // 定义开始的索引
  var index = 1;
  // 获取要用到的元素
  var imgBox = document.querySelector(".imgBox");
  var bannerW = document.querySelector(".jd_banner").offsetWidth;
  var count = imgBox.querySelectorAll("li").length;
  var timeId;
  // 封装自动轮播的方法
  function startTime() {
    // 开始一个定时器
    timeId = setInterval(function () {
      // 索引每秒加一
      index++;
      // 给盒子加个过渡效果
      imgBox.style.transition = "left 0.5s";
      // 将索引计算出轮播图盒子要走的距离
      imgBox.style.left = -index * bannerW + "px";
      // 当走到最后一张时，回到第一张，并去掉过渡效果，达到瞬间回掉的效果
      setTimeout(function () {
        if (index == count - 1) {
          index = 1;
          imgBox.style.left = -index * bannerW + "px";
          imgBox.style.transition = "none";
        }
      }, 500);
    }, 1500);
  }
  // 调用一次自动轮播的方法
  startTime();

  // 定义要用到的手机触摸事件的坐标
  var startX = 0, endX = 0, distanceX = 0;
  // 定义节流阀，等过渡效果结束再让用户移动
  var isEnd = true;
  // 注册手指触摸事件
  imgBox.addEventListener("touchstart", function (e) {
    // 手指触摸到屏幕时停止自动轮播的定时器
    clearInterval(timeId);
    // 获取手机触摸到屏幕时距离视口的横坐标
    startX = e.targetTouches[0].clientX;
  });
  imgBox.addEventListener("touchmove", function (e) {
    if (isEnd) {
      // 获取手机触摸到屏幕时距离视口的横坐标
      endX = e.targetTouches[0].clientX;
      // 算出当次触摸事件横坐标移动了多少距离
      distanceX = endX - startX
      // 过渡效果有延迟，会影响操作，所以先去掉过渡效果
      imgBox.style.transition = "none";
      // 让盒子移动当前索引所移动的宽度加上触摸事件移动的距离
      imgBox.style.left = -index * bannerW + distanceX + "px";
    }
  });
  imgBox.addEventListener("touchend", function () {
    isEnd = false;
    // 手指离开屏幕时开始自动轮播
    startTime();
    // 因为在触摸移动时去掉了过渡效果，所以加上过渡效果
    imgBox.style.transition = "left 0.5s";
    // 根据移动距离的长短做出不同操作
    if (Math.abs(distanceX) > 150) {
      // 移动距离大于0就往后退，小于0就往前进
      if (distanceX > 0) {
        index--;
      } else {
        index++;
      }
      imgBox.style.left = -index * bannerW + "px";
    } else if (Math.abs(distanceX) > 0) {
      imgBox.style.left = -index * bannerW + "px";
    }
    startX = 0;
    endX = 0;
    distanceX = 0;
  });

  imgBox.addEventListener("webkitTransitionEnd", function () {
    if (index == count - 1) {
      index = 1;
    } else if (index == 0) {
      index = count - 2;
    }
    imgBox.style.transition = "none";
    imgBox.style.left = -index * bannerW + "px";
    // setTimeout(function () {
      isEnd = true;
    // }, 100);
  })
}