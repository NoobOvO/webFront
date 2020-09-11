const express=require("express");
const  app=express();
app.get("/index",(req,rsp)=>{
  rsp.send(req.query);        //得到get请求url地址后面的参数 并已json格式显示
});
// http://localhost/index?name=lisi&&age=20
//{"name":"lisi","age":"20"}
app.listen(80);
