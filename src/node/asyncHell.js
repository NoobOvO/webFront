const fs=require("fs");
//回调地狱 嵌套   解决方案:Promise
fs.readFile("./file/1.txt","utf8",(err,doc1)=>{
  console.log(doc1);
  fs.readFile("./file/2.txt","utf8",(err,doc2)=>{
    console.log(doc2);
    fs.readFile("./file/3.txt","utf8",(err,doc3)=>{
      console.log(doc3);
    });
  });
});
//没加utf8 打印不出来
