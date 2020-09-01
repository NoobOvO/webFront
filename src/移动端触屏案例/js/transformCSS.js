(function (w) {
 w.transformCSS = function(node,prop,value) {
    //给元素设置值
    if(node.transformData === undefined){      //如果没有就创建一个
      node.transformData={};
    }

    if(arguments.length>2){  //这个地方我踩坑惹 。。。

      //把value赋给tranformData的属性种
      node.transformData[prop]=value;

      //遍历transformData
      var result='';
      for(var  i in node.transformData){
        switch (i) {
          case "translate":
          case "translateX":
          case "translateY":
            result += i + "("+node.transformData[i]+"px) ";
            break;
          case "scale":
          case "scaleY":
          case "scaleX":
            result += i + "("+node.transformData[i]+") ";
            break;
          case "rotate":
          case "skew":
          case "skewX":
          case "skewY":
            result += i + "("+node.transformData[i]+"deg) ";
            break;
        }
      }
      node.style.transform=result;
    }else {
      //读取数据 返回值
      //如果没有value 给个默认值
      if(node.transformData[prop] === undefined){      //又踩了一个坑。。。  第一个属性没有定义 就给他个默认值和属性名
        if(prop=="scale"||prop=="scaleY"||prop=="scaleX"){
           value=1;
        }else {
           value=0;
        }
      }else {
        value=node.transformData[prop];
      }
      return value;


    }







  }
})(window);
