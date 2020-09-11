//app.use 不区分请求方式 是中间件的另一种手段
const express=require("express");
const app=express();
app.use((req,rsp,next)=>{
  console.log("use.app的普通请求");
  next();
});
app.use("/comeon",(req,rsp,next)=>{  //指定路径 只有走这个路径才会调用这个方法
  console.log("use.app的/comeon请求");
  next();
});
app.get("/comeon",(req,rsp)=>{
  rsp.send("你好啊");
});



app.listen(80);
