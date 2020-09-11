const fs=require("fs");
const content="<h1>你好啊,全世界</h1>";

//如果没有创建这个文件,API会帮我们创建这个文件
fs.writeFile("./index.txt",content,function (err) {

  if(err!=null){
    console.log(err);
    return;
  }
  console.log("写入文件完成,soeasy");

});
