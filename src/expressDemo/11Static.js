const express=require("express");
const  app=express();
//静态资源访问
const path=require("path");

app.use(express.static(path.join(__dirname,"public")));
//怎么访问 以static为跟目录 写跟目录以下的路径即可
//http://localhost/css/bootstrap.css    看到没 劳资因为这个踩了半天的坑 和serve-static插件同理

app.listen(80);
