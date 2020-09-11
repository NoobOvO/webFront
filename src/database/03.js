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
//第二种写法  回调函数的方式 或 创建Promise对象的方式
/*Course.create({name:"yuwen",teacher: "刘老师",isPublish: false},(err,doc)=>{
  console.log(err);
  console.log(doc);
});*/
//第三种写法 Promise 也就是then和catch的链式编程
Course.create({name:"english",teacher: "马老师",isPublish: false})
.then(doc=>{console.log(doc)})
.catch(err=>{console.log(err)});
