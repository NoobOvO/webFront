const fs=require("fs");
const path=require("path");
//__dirname 就是当前文件下的绝对路径
//如果你写相对路径 他是相对于命令行当前文件目录的 会有隐患
console.log(__dirname);
console.log(path.join(__dirname,"b.js"));
fs.readFile(path.join(__dirname,"b.js"),"utf8",function (err,doc) {
  console.log(err);
  console.log(doc);
})
