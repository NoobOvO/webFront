//静态资源访问
const http=require("http");
const app=http.createServer();
const path=require("path");
const fs=require("fs");
const url=require("url");
const mime=require("../node_modules/mime");

app.on("request",function (res,rsp) {

  //首先你是GET请求 队路径做处理
let pathname= url.parse(res.url).pathname;
 pathname = pathname == "/" ? "/video.html":pathname;
  let type=mime.getType(pathname);
  console.log(type);

  let reqPath=path.join(__dirname,"public"+pathname);
  console.log(reqPath);
  fs.readFile(reqPath,function (err,content) {
    if(err){
      rsp.writeHead(404,{
        "content-type":"text/html;charset=utf8"
      });
      rsp.end("文件读取失败");
      return;
    }
    rsp.writeHead(200,{
      "content-type":type
    });
    rsp.end(content);
  });

});
app.listen(8080);
console.log("finish");
