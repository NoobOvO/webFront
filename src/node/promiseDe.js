const fs=require("fs");
 //Promise 注意大写 构造函数
let promise=new Promise((resolve,reject)=>{
     fs.readFile("./file/1.txt","utf8",function (err,doc) {
       if(err){
         reject(err);
       }else {
         resolve(doc);
       }
     });
});
//初遇promise  首先是解决回调函数嵌套地狱的
promise.then(function (doc) {
  console.log(doc);
}).
catch(function (err) {
    console.log(err);
});
