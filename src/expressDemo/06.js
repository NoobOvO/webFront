const  express=require("express");
//创建网站服务器
const app=express();

const home=express.Router();
app.use("/index",home);
home.get("/hello.art",(req,rsp)=>{
  rsp.send("您现在访问的是二级路由");
});



app.listen(80);
