const express=require("express");
const app=express();




//运营维护 全部拦截
/*app.use((req,rsp,next)=>{
  rsp.send("该系统正在维护.........下午再来吧");
})*/

//拦截登录请求
app.use("/admin",(req,rsp,next)=>{
  const isLogin=true;
  if(isLogin){
   rsp.send("登录失败咯");
  }else {
    rsp.send("登录成功");
    next();
  }
})

app.get("/admin",(req,rsp)=>{
  rsp.send("helloworld");
})


//如何定义404 界面  再所有请求之后 最后面 没有路径可找时定义
app.use((req,rsp,next)=>{
  rsp.status(404).send("该页面不存在,哭哭惹");
})





app.listen(80);
console.log("服务器登录成功");
