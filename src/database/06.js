let mongoose=require("../node_modules/mongoose");
mongoose.connect("mongodb://localhost/playground",{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    console.log("连接数据库成功");
  })
  .catch(err=>{
    console.log("连接数据库失败"+err);
  });


//对插入字段进行校验 严格
const artitle=mongoose.Schema({
      title:{
        type:String,
        //true 默认值不能为空
        required:[true,"内容不能为空"],
        maxlength:[6,"最大值为6"],
        minlength:[2,"最小值为2"],
        //去除两边空格
        trim:true
      },
  age:{
    type:Number,
    min:18,
    max:60
  },
  publishDate:{
        type: Date,
        default:Date.now
  },
  category:{
        type:String,
        enum:{
          values:['xiaoshuo','book'],
          message: "您输入的信息不符合枚举选项"
        }
  },
  author:{
        type:String,
        validate:{
          validator:v=>{
          return  v && v.length>4;
          },
          message:"作者姓名长度至少为4!"
        }
  }

});
const  wenzhang=mongoose.model("Article",artitle);
wenzhang.create({title: "《寻龙诀》",age:20,category: 'boo',author:'fr'})
  .then(result=>{console.log(result)})
  .catch(error=>{
    //获得错误信息对象
    let err=error.errors;
    //遍历
    for(var attr in err){
      //打印指定的错误信息对象
      console.log(err[attr]["message"]);
    }

  });
