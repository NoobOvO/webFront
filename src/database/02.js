let mongoose=require("../node_modules/mongoose");
mongoose.connect("mongodb://localhost/playground",{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    console.log("连接数据库成功");
  })
  .catch(err=>{
    console.log("连接数据库失败"+err);
  });
//通过mongoose对数据库进行crud
//我要创建 集合规则 集合 插入数据
//创建集合规则
const courseData=new mongoose.Schema({
  name:String,
  teacher:String,
  isPublish:Boolean
});
//创建集合
let Course=mongoose.model("Course",courseData);
//实例
let math = new Course({
  name:"math",
  teacher:"maTeacher",
  isPublish: true
});
//插入数据库
math.save(); //接下来  执行该脚本 你会在mongoDB compass看到插入的
