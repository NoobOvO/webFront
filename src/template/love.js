const template=require("art-template");
const path=require("path");
const myPath=path.join(__dirname,"views","forYou.art");
const html=template(myPath,{
  content:"<h1>你好啊</h1>"
});

console.log(html);
