const express=require("express");
const  app=express();
const path=require("path");


//使用express-art-template的三部曲
//npm install express-art-template art-template
//你要用哪个模板引擎
app.engine("art",require("express-art-template"));

//你的模板引擎默认文件夹
app.set("views",path.join(__dirname,"views"));

//设置默认值 省去后缀名
app.set("view engine","art");

//使用模板 方法为render 一步到位
//rsp.render(模板引擎文件);
app.get("/index",(req,rsp)=>{
  rsp.render("hello",{
    meg:"hello world express-art-template???"
  });

})
app.get("/list",(req,rsp)=>{
  rsp.render("list",{
    list:["lulu","kill","inner"]
  });


});



app.listen(80);
