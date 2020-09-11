function ajax(options) {
  let defaults={ //默认值 什么参数都没有的情况下
    method:"get",
    data:{},
    url:'',
    header:{"Content-Type":"application/x-www-form-urlencoded"},
    success:function (data,obj) {
    },
    error:function (data,obj) {
    }

  };
  //对象覆盖 使用options中的属性覆盖defaults
  Object.assign(defaults,options);

  let xhr=new XMLHttpRequest();
  //传过来的data进行处理  get send() post send(params) 并对post的writeHeader进行处理
  let params='';
  for(let attr in defaults.data){
    params += attr+"="+defaults.data[attr]+"&";
  }
  //对?后的字符串进行处理 把最后的&去掉
  params=params.substr(0,params.length-1);

  if(defaults.method=="get"){
    defaults.url+="?"+params;
    xhr.open(defaults.method,defaults.url);
    xhr.send();

  }
  if(defaults.method=="post"){
    let contentType=defaults.header["Content-Type"];
    xhr.open(defaults.method,defaults.url);
    //设置请求头
    xhr.setRequestHeader("Content-Type",contentType);
    if(contentType=="application/json"){
      //转成字符串
      xhr.send(JSON.stringify(defaults.data));
    }else{
      //params已经是String类型的了
      xhr.send(params);
    }

  }

  xhr.onload=function () {
    let  responseText=xhr.responseText;
    if(xhr.status==200){
      //响应时 执行成功的回调函数
      //需求4:把服务器返回来的数据进行转换,因为都是字符串 具体问题具体分析
      //响应头
      let  type= xhr.getResponseHeader("Content-Type");
      //如果响应传过来的是json 就解析为JSON
      if(type.includes("application/json")){
        responseText=JSON.parse(responseText);
      }
      defaults.success(xhr.responseText,xhr);
    }else {
      defaults.error(responseText,xhr);
    }
  }
}
