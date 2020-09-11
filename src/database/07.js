let mongoose=require("../node_modules/mongoose");
mongoose.connect("mongodb://localhost/playground",{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    console.log("连接数据库成功");
  })
  .catch(err=>{
    console.log("连接数据库失败"+err);
  });

//球队
let items=mongoose.Schema({
      name:{
        type:String,
        required:true
      }
});
//球员
let player=mongoose.Schema({
  item:{
    type:mongoose.Schema.Types.ObjectID,
    ref:"items"
  },
  name:{
    type:String,
    required:true
  },
  age:Number
});
let itemModel=mongoose.model("items",items);
let  playerModel=mongoose.model("player",player);

//添加数据 关联集合
//itemModel.create({name:"laker"}).then(result=>{console.log(result)});
//playerModel.create({item:"5f530c91a5e111250423ba27",name:"LBJ",age: 36}).then(result=>{console.log(result)});

//查询 populate是关联对应字段的信息
playerModel.find().populate("item").then(result=>{console.log(result)});

















