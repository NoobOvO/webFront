const mongoose=require("mongoose");
const studentSchema =mongoose.Schema({
  name:{
    type:String,
    require:true,
    maxlength:10,
    minlength:2
  },
  age:Number,
  sex:Number,
  email:String,
  hobbies:[String],
  college:String,
  joinTime:{
    type: Date,
    default:Date.now
  }
});
const student=mongoose.model("Student",studentSchema);
module.exports=student;
