const express=require("express");
//express框架 封装NodeJs API
const app=express();
const path=require("path");
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost/playground",{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    console.log("连接数据库成功");
  })
  .catch(err=>{
    console.log("连接数据库失败"+err);
  });

let userData=new mongoose.Schema({
  name:String,
  age:Number,
  hobbies:[String],
  password:String,
  email:String
});
//创建具体的集合
let User=mongoose.model("users",userData);

//读取静态资源
app.use(express.static(path.join(__dirname,"public")));
//接受客户端发来的请求


//跨域 拦截所有的请求 并允许跨域
app.use((req,rsp,next)=>{
  //允许客户端访问我
  rsp.header('Access-Control-Allow-Origin','*');
  //允许客户端访问的方法有哪些
  rsp.header('Access-Control-Allow-Method','get,post');
  //向下执行 否则卡死在这
  next();
});

app.get("/email",(req,rsp)=>{
  let eamil= req.query.email;
  if(eamil!="2472225284@qq.com"){
    rsp.send({msg:"该邮箱可以注册"});
  }else {
    rsp.status(400).send({msg:"该邮箱已被注册"});
  }

});
//搜索框
app.get("/search",async (req,rsp)=>{
 const key= req.query.key;
  let arr=await User.find({});
  let ai=[];
  for (let i = 0; i < arr.length; i++) {
    let{name}=arr[i];
    ai.push(name);
  }
  let newAI=ai.filter(item=>item.includes(key)); //箭头函数就可以。。 普通的function不行
    rsp.send(newAI);

});

app.get("/cors",(req,rsp)=>{
     rsp.status(200).send("恭喜你,跨域成功!");
});


//监听端口
app.listen(80);
