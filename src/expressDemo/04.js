const  express=require("express");
//创建网站服务器
const app=express();
//对文件进行操作
const fs=require("fs");


//对异步错误函数进行处理
app.get("/user",(req,rsp,next)=>{
  fs.readFile("./02.js","utf8",(err,doc)=>{
    if(err){
      next(err);//如果没有文件,触发use中间件的错误方法
    }else {
      rsp.send(doc);
    }
  })
})

app.use("/user",(err,req,rsp,next)=>{
  rsp.status(500).send(err.message);
})




app.listen(80);
