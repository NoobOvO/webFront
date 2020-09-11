const fs=require("fs");
//系统模块
fs.readFile("./a.js","utf8",function (err,doc) {
  if(!err){
    console.log(doc); //如果文件读取没有错误，就显示文件信息
    //err不出错是null 出错是一个对象
  }
});
