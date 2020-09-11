const express=require("express");

const home=express.Router();
home.get("/home",(req,rsp)=>{
  rsp.send("欢迎来到博客的展示页面");
});
module.exports=home;
