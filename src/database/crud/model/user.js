//创建集合
let mongoose=require("../../../node_modules/mongoose");
let users=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:String,
  hobbies: [String],
  email:String,
  age:Number
});
const userModel=mongoose.model("User",users);

module.exports=userModel;
