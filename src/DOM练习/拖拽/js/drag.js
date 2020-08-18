function drag(dragNode,konckNode,startColor,endColor,wrapNode) {
    var area=null;
  if(wrapNode){
    wrapNode.style.position="relative";
    area=wrapNode;
  }else {
    area=document.documentElement;
  }

  //鼠标的初始距离
  var mouseUp={x:0,y:0};
  //鼠标移动的距离
  var mouseOver={x:0,y:0};
  //元素的初始距离
  var appUP={x:0,y:0};
  //元素移动的距离
  var appOver={x:0,y:0};
  app.onmousedown=function (ev) {


    //ie的全局捕获  用的少 只有IE6 7 8 才有效果
    if(app.setCapture){
      app.setCapture();
    }

    ev=ev||event;
    //鼠标的初始距离
    mouseUp.x=ev.clientX;
    mouseUp.y=ev.clientY;

    //元素的初始距离
    appUP.x=this.getBoundingClientRect().left;
    appUP.y=this.getBoundingClientRect().top;
    document.onmousemove=function (ev) {
      ev=ev||event;
      //鼠标移动的距离
      mouseOver.x=ev.clientX;
      mouseOver.y=ev.clientY;

      var L=appUP.x+(mouseOver.x-mouseUp.x);
      var H=appUP.y+(mouseOver.y-mouseUp.y);

      var maxL=area.clientWidth-app.offsetWidth;
      var maxH=area.clientHeight-app.clientHeight;

      L=L<0?0:L;
      H=H<0?0:H;
      L=L>maxL?maxL:L;
      H=H>maxH?maxH:H;

      appOver.x=L+"px"
      appOver.y=H+"px"
      app.style.left= appOver.x;
      app.style.top=appOver.y;

      if(konckNode){
        var L2=app.getBoundingClientRect().left;
        var R2=app.getBoundingClientRect().right;
        var T2=app.getBoundingClientRect().top;
        var B2=app.getBoundingClientRect().bottom;

        var L1=wrap.getBoundingClientRect().left;
        var R1=wrap.getBoundingClientRect().right;
        var T1=wrap.getBoundingClientRect().top;
        var B1=wrap.getBoundingClientRect().bottom;


        if(!( B2<T1||T2>B1||R2<L1||L2>R1)){
          //碰撞了
          typeof startColor == "function" ? startColor():"";
        }else{
          typeof endColor == "function" ? endColor():"";
        }
      }

    }

    document.onmouseup=function (ev) {
      ev=ev||event;
      document.onmousemove=document.onmouseup=null;
      if(document.releaseCapture){
        document.releaseCapture();
      }

    }


  }

}
