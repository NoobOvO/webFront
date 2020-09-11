const  express=require("express");
//创建网站服务器
const app=express();
//对文件进行操作
const fs=require("fs");
const promisify=require("util").promisify; //搞异步函数
const readFile=promisify(fs.readFile);
const path=require("path");



//对异步错误函数进行处理
app.get("/user",async (req,rsp,next)=>{
  try {
    console.log();
   await readFile(path.join(__dirname,"01.js"),"utf8",(err,doc)=>{
     rsp.send(doc);
   });
  }catch (e) {
    next(e);
  }

})

app.use("/user",(err,req,rsp,next)=>{
  rsp.status(500).send(err.message);
})




app.listen(80);
