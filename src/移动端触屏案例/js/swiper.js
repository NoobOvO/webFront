//封装插件
(function (w) {
  w.swiper=function (options) {

// 乱滑-斜着滑：  第一次:判断你是水平滑动还是垂直滑动，以后按照第一次的方向处理  以后: 横着滑 阻止浏览器默认行为 竖着化 不阻止浏览器默认行为 水平滑动距离设置为0

    //复制 把索引掉个 1=6 10=5
    window.onload=function () {
      //el:轮播图的包裹元素 必选
      //pagination:元素(可选)
      //isAutoPlay:自动播放(可选)
      //delay:播放间隔(可选)

      //封装变量
      if(options.ele===undefined){
        console.error("请您设置初始参数");
        return;
      }
      var banners =options.ele; //包裹元素做桥接
      var pagination =  options.pagination || null; //放置小圆点span的包裹元素
      var isAutoplay= options.isAutoplay || false;
      var delay= options.delay||5000;
      banners.classList.add("banners"); //给包裹元素加个 类



      //动态变化轮播图区域长度
      var itemLength= banners.querySelectorAll(".banners-items li").length; //复制前li的宽度
      var bannersitems=banners.querySelector(".banners-items");
      var index=0; //切换轮播图的索引 全局变量


      var bns=banners.querySelectorAll(".banners-items li");//多少张图片
      var spandots;
      if(pagination){
        pagination.classList.add("pagination");
        bns.forEach(function (item) {
          var span= document.createElement("span");
          pagination.appendChild(span);
        })
       spandots =  pagination.querySelectorAll(".pagination span");
      }


      bannersitems.innerHTML+=bannersitems.innerHTML; //复制一份
      var bannersitemsLi=banners.querySelectorAll(".banners-items li"); //重新获取LI

      bannersitems.style.width=bannersitemsLi.length*100+"%";
      bannersitemsLi.forEach(function (item) {
        item.style.width=100/bannersitemsLi.length+"%";
      })
      banners.style.height=bannersitems.offsetHeight+"px";

      //初始active的高亮       一开始是touchend事件里放了这个函数 导致没有高亮 现在加载后就有高亮
      setBannersIndex(index);

  if(isAutoplay){
    //自动定时 不进行任何操作
    //定时
    var timeId= setInterval(function () {
      index++;
      bannersitems.style.transition=".5s"; //过度效果
      setBannersIndex(index);
    },delay);
  }


      //过渡完调用
      bannersitems.addEventListener("transitionend",timeOOO);


      //滑动
      banners.addEventListener("touchstart",function(ev) {

        //优化
        this.firstMove=true;//第一次滑动的标识
        this.isHorizental=true; //是否为垂直滑动

        bannersitems.style.transition="none"; //取消过度效果
        //无缝衔接的最后一步 下标变化 0变5 9变4 给你一种错觉的环形结构
        if(index<=0){   //踩的坑  位置写上面 不然衔接不了
          index=itemLength;
          bannersitems.style.left=-index*banners.clientWidth+"px";
        }else if(index>=bannersitemsLi.length-1){
          index=itemLength-1;
          bannersitems.style.left=-index*banners.clientWidth+"px";
        }

        var touch=  ev.changedTouches[0];
        this.startX=touch.clientX; //开始滑动
        this.startY=touch.clientY;//水平方向移动
        this.cleX=bannersitems.offsetLeft;//开始位置

    if(isAutoplay){
      //手按上去 让轮播图定时停止
      clearInterval(timeId);//时间静止

    }
        this.startTime= (new Date).getTime();

        ev.preventDefault();

      })
      //移动
      banners.addEventListener("touchmove",function(ev) {
        if(!this.isHorizental){
          return;        //是垂直滑动就不执行下面的代码
        }


        var touch= ev.targetTouches[0];
        var endX=touch.clientX; //开始滑动
        var endY=touch.clientY;//垂直方向

        this.allYY= endY-this.startY; //垂直滑动距离
        this.allX= endX-this.startX; //水平滑动的距离
        this.maxX=this.cleX+this.allX;
        //判断是否第一次滑动 如果是 后面默认都是第一次滑动的方向
        //乱滑 水平大于垂直
        if(this.firstMove){ //解决不停滑动时 浏览器判断的报错 太快浏览器判断不过来
          this.firstMove=false; //你就不是第一次滑动了
          if(Math.abs(this.allX)<Math.abs(this.allYY)){
            this.allX=0;
            this.isHorizental=false; //让它执行上边的代码
            return;
          }
        }
        bannersitems.style.left=this.maxX+"px"; //滑动的状态 开始水平滑动
        ev.preventDefault(); //阻止浏览器的默认行为 阻止垂直滑动

      })

      //切换  轮播图的切换  我认为一样适用于PC端 给全局一个index 然后改变大包含块的left值
      banners.addEventListener("touchend",function (ev) {
        bannersitems.style.transition=".5s"; //松手后 延时0.5m

        //index范围判断
        if(index<0){
          index=0;
        }
        if(index>bannersitemsLi.length-1){
          index=bannersitemsLi.length-1;
        }


        //结束时间
        var endTime=  (new Date).getTime();
        var disTime=endTime-this.startTime;
        if(disTime<500){
          //快滑
          if(this.allX<0){
            index++;
          }else if(this.allX>0){
            index--;
          }
        }else if(disTime>500){
          if(Math.abs(this.allX)>bannersitemsLi[0].clientWidth/2){
            if(this.allX<0){
              //向左划 下一张
              index++;
            }else if(this.allX>0){
              //向右滑 上一张
              index--;
            }
          }
        }




    if(isAutoplay){
      //松手之后 重新定时
      timeId= setInterval(function () {
        index++;
        bannersitems.style.transition=".5s"; //过度效果
        setBannersIndex(index);
      },delay);  //重新开始
    }


        //轮播图的位置
        setBannersIndex(index);

      })



      //轮播图的具体位置  active的高亮
      function setBannersIndex(current) {
        bannersitems.style.left=-banners.clientWidth*current+"px";
       if(pagination){
         spandots.forEach(function (item) {
           item.classList.remove("active");
         });
         spandots[current%spandots.length].classList.add("active"); //0和5的余数是0  1和5的余数是1 2 3 4 0 1 2 3 4
         //感觉都是一些巧妙的小算法
       }
      }
      function timeOOO() {
        if(index>=bannersitemsLi.length-1){
          index=itemLength-1;
          bannersitems.style.transition="none"; //取消过度效果
          bannersitems.style.left=-index*banners.clientWidth+"px";
        }
      }

    }



  }

})(window)
