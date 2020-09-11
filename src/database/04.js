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

//查询所有
//User.find().then(doc=>{console.log(doc)});

//根据ID查询  find方法无论查询多少条 都是数组的形式 空就是空数组
//User.find({_id:"5f52445d586392476ebcf82b"}).then(doc=>{console.log(doc)});

//查询一条  这个是一个json对象 不是数组
//User.findOne({_id:"5f52445d586392476ebcf82b"}).then(doc=>{console.log(doc)});

//范围查询  age:20-50
//User.find({age:{$gt:20,$lt:50}}).then(result=>{console.log(result)});

//包含
//User.find({gender:{$in:"man"}}).then(result=>{console.log(result)});

//查询指定的字段
//User.find().select('_id gender').then(result=>{console.log(result)});
//User.find().select('-_id gender name').then(result=>{console.log(result)});


//对查询条件进行排序 升序
//User.find().sort("age").then(result=>{console.log(result)});

//降序
//User.find().sort("-age").then(result=>{console.log(result)});

//跳过skip()  限制数量limit()
User.find().skip(2).limit(3).then(result=>{console.log(result)});







