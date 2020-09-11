//连接数据库
let mongoose=require("../../../node_modules/mongoose"); //nodejs的缓存机制 变量多次使用不会造成性能上的浪费
mongoose.connect("mongodb://localhost/playground",{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(doc=>{console.log("数据库连接成功")})
  .catch(err=>{console.log("数据库连接失败")});
