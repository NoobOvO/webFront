const express=require("express");//express是一个框架 对nodejs的服务端API进行了简化处理

//创建网站服务器
const app=express();
app.get("/request",(req,rsp,next)=>{
  req.name="张三";
  next();//不用就会终止请求 不会向下走
});
app.get("/request",(req,rsp)=>{
  rsp.send(req.name);//上面用了next() 同一个路径 所以这一步也会走
});

app.listen(80);
console.log("服务器连接成功");
