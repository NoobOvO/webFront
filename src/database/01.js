let mongoose=require("../node_modules/mongoose");
mongoose.connect("mongodb://localhost/playground",{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    console.log("连接数据库成功");
  })
  .catch(err=>{
    console.log("连接数据库失败"+err);
  });

