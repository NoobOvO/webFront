const  express=require("express");
//创建网站服务器
const app=express();
const home=require("./route/home");
const admin=require("./route/admin");
app.use("/index",home); //设置一级路由
app.use("/index",admin);

app.listen(80);
