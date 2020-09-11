const http=require("http");
const url=require("url");


const app=http.createServer();
app.on("request",function (req,rsp) {
  //text/plain 纯文本模式  text/html html模式
  rsp.writeHead(200,{'content-type':'text/html;charset=utf8'});

  let{query,pathname}= url.parse(req.url,true);
  //query就是拿出?后面的参数 并以键值对的方式表示
  //pathname就是?之前/根目录后面的路径
  console.log(query.name);
  console.log(query.age);

  if(pathname=="/"||pathname=="/index"){
    rsp.end("<h1>你好,我是谁</h1>");
  }else if(pathname=="/list"){
    rsp.end("<h2>宠物列表</h2>");
  }else{
    rsp.end("not found");
  }



});
app.listen(8080); //监听端口
