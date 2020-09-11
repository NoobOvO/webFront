const express=require("express");
                //路由的模块化开发
const admin=express.Router();
admin.get("/admin",(req,rsp)=>{    //二级路由
  rsp.send("欢迎来到博客的管理页面");
});
module.exports=admin;
