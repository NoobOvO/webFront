require("./connect/connect");//导入数据库
const student=require("./connect/user");//引入学生对象 并对数据库进行操作
const  router=require("./route");//路由模块
const template=require("art-template");//模板引擎
const path=require("path");
const serveStatic=require("serve-static");//静态资源加载
const serve=serveStatic(path.join(__dirname,"public"));
const queryString=require("querystring");
const dateformat=require("dateformat");//时间格式化



template.defaults.root=path.join(__dirname,"view");//自动寻找当前目录的模板文件
template.defaults.imports.dateformat=dateformat;//导入模板 这是一个处理日期格式的方法
//{{dateformat($value.joinTime,"yyyy-mm-dd")}}

const  http=require("http");
const app=http.createServer();

//学生档案添加页面
router.get("/add",(req,rsp)=>{
  let html=template("add.art",{});
  rsp.end(html);
});
//学生档案详情列表
router.get("/list",async (req,rsp)=>{
  let students= await student.find();
  console.log(students);
 let ht=template("list.art",{
   students:students
 });
  rsp.end(ht);
});
//实现学生添加功能
router.post("/add",(req,rsp)=>{
  let dataForm="";
  req.on("data",(params)=>{
    dataForm+=params;
  });
   req.on("end",async ()=>{
     //添加到数据库
     await  student.create(queryString.parse(dataForm));
     //增加完后 就重定向
     rsp.writeHead(301,{
       Location:"/list"
     });
     //把这次请求结束掉
     rsp.end();

   })


});



app.on("request",(req,rsp)=>{
router(req,rsp,()=>{}); //启动路由 它会去找你调用了哪个路由地址        踩了坑 第三个回调参数是必填的 虽然没什么用 不写就会报错
  serve(req,rsp,()=>{});//启动加载静态资源
});





app.listen(80);
