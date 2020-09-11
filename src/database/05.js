let mongoose=require("../node_modules/mongoose");
mongoose.connect("mongodb://localhost/playground",{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    console.log("连接数据库成功");
  })
  .catch(err=>{
    console.log("连接数据库失败"+err);
  });


//查询
//创建集合规则
let userData=new mongoose.Schema({
  name:String,
  age:Number,
  gender:String
});
//创建具体的集合
let User=mongoose.model("users",userData);

//删除操作  亲测有效 我的数据没了一个
//它只删除一个 而且是第一个
//User.findOneAndDelete({name:"xiaoming"}).then(result=>{console.log(result)});

//删除多条文档 这个会把集合所有信息删除 慎用
//User.deleteMany({}).then(result=>{console.log(result)});

//更新操作 一个
//User.updateOne({name:"bat"},{name:"BAT"}).then(result=>{console.log(result)});

//一次性更新多个文档 慎用 看好条件再使用
//User.updateMany({name:"bat"},{name:"BAT"}).then(result=>{console.log(result)});
