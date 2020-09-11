const template=require("art-template");
const path=require("path");
const indePath=path.join(__dirname,"views","index.art");

//扔路径和json对象  路径最好是绝对路径
const html=template(indePath,{
  name:"炫狗",
  age:24,
  content:"<h1>大家好,我是电棍</h1>"
});
console.log(html);//该对象为art的html全部内容
/*
* <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>add</title>
</head>
<body>
炫狗
24
</body>
</html>
* */

//模板引擎是让开发者更加友好的拼接字符串 让代码更清晰 更加易于维护
//art-template是现在比较流行的模板引擎  是腾讯出的 也是现流行模板引擎速度最快的
