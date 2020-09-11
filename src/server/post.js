const http=require("http");

const querystring=require("querystring");

const app=http.createServer();
app.on("request",function (req,rsp) {
  //text/plain 纯文本模式  text/html html模式
  rsp.writeHead(200,{'content-type':'text/html;charset=utf8'});
      let sum="";
   req.on("data",function (params) {
     //接受的请求参数  post请求参数不会一次性接完(如果参数量大),需要一次次的拼接
     sum+=params;
   });

   req.on("end",function () {
     console.log(querystring.parse(sum));
   });
   rsp.end("the end");

});
app.listen(8080); //监听端口
