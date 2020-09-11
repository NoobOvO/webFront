const express=require("express");
//express框架 封装NodeJs API
const app=express();
const path=require("path");
const formidata=require("formidable");
const Cookie=require("cookies");
const cookieParser=require('cookie-parser');

//读取静态资源
app.use(express.static(path.join(__dirname,"public")));
//读取cookieParser  这个插件是用来读取cookie的  存cookie是express自带的
app.use(cookieParser());
//跨域 拦截所有的请求 并允许跨域
app.use((req,rsp,next)=>{
  //允许客户端访问我
  rsp.header('Access-Control-Allow-Origin','http://localhost');
  //允许客户端访问的方法有哪些
  rsp.header('Access-Control-Allow-Method','get,post');
  //跨域携带cookies
  rsp.header('Access-Control-Allow-Credentials',true);
  //向下执行 否则卡死在这
  next();
});


//接受客户端发来的请求
app.post("/first",(req,rsp)=>{
  let data='';
  req.on("data",params=>{
    data+=params;
  });

  req.on("end",()=>{
    rsp.send(data);
  });
});
app.get("/email",(req,rsp)=>{
 let eamil= req.query.email;
  if(eamil!="2472225284@qq.com"){
    rsp.send({msg:"该邮箱可以注册"});
  }else {
    rsp.status(400).send({msg:"该邮箱已被注册"});
  }
});



app.get("/province",(req,rsp)=>{
 let array= [{
    id: '001',
    name: '黑龙江省'
  },{
    id: '002',
    name: '四川省'
  },{
    id: '003',
    name: '河北省'
  },{
    id: '004',
    name: '江苏省'
  }]

  rsp.send(array);

});


app.get("/cities",(req,rsp)=>{
if(req.query.id=='001'){
  rsp.send(
    [{
      id: '300',
      name: '哈尔滨市'
    }, {
      id: '301',
      name: '齐齐哈尔市'
    }, {
      id: '302',
      name: '牡丹江市'
    }, {
      id: '303',
      name: '佳木斯市'
    }]
  );

}else if(req.query.id=='002'){
  rsp.send(
    [{
      id: '400',
      name: '猪市'
    }, {
      id: '401',
      name: '狗市'
    }, {
      id: '402',
      name: '猩猩市'
    }, {
      id: '403',
      name: '詹姆斯市'
    }]
  );

}else if(req.query.id=='003'){
  rsp.send(
    [{
      id: '500',
      name: '哈皮市'
    }, {
      id: '501',
      name: '垃圾市'
    }, {
      id: '502',
      name: '辣鸡市'
    }, {
      id: '503',
      name: '一条狗市'
    }]
  );

}else if(req.query.id=='004'){
  rsp.send(
    [{
      id: '600',
      name: '勒布朗市'
    }, {
      id: '601',
      name: '非酋市'
    }, {
      id: '602',
      name: '路况市'
    }, {
      id: '603',
      name: '发达市'
    }]
  );

}


});


app.get("/areas",(req,rsp)=>{
if(req.query.id=='300'){
  rsp.send([
    {id:'111',name:'雄县'},
    {id:'112',name:'大阪县'},
    {id:'113',name:'北海道县'},
    {id:'114',name:'哟西县'},
  ])
}

  if(req.query.id=='301'){
    rsp.send([
      {id:'111',name:'O县'},
      {id:'112',name:'K县'},
      {id:'113',name:'A县'},
      {id:'114',name:'W县'},
    ])
  }
  if(req.query.id=='302'){
    rsp.send([
      {id:'111',name:'S县'},
      {id:'112',name:'X县'},
      {id:'113',name:'Z县'},
      {id:'114',name:'Q县'},
    ])
  }
  if(req.query.id=='303'){
    rsp.send([
      {id:'111',name:'QQ县'},
      {id:'112',name:'SS县'},
      {id:'113',name:'ZZ县'},
      {id:'114',name:'XX县'},
    ])
  }
  if(req.query.id=='400'){
    rsp.send([
      {id:'111',name:'II县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'SS县'},
    ])
  }
  if(req.query.id=='401'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'SS县'},
    ])
  }
  if(req.query.id=='402'){
    rsp.send([
      {id:'111',name:'大O县'},

    ])
  }
  if(req.query.id=='403'){
    rsp.send([
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='500'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='501'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='502'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='503'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='600'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='601'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='602'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
      {id:'113',name:'北海道县'},
      {id:'114',name:'哟西县'},
    ])
  }
  if(req.query.id=='603'){
    rsp.send([
      {id:'111',name:'雄县'},
      {id:'112',name:'大阪县'},
    ])
  }

});

app.post("/formdata",(req,rsp)=>{
  const form=new formidata.IncomingForm();
  form.parse(req,(err,fields,file)=>{
    rsp.send(fields);
  });
});



app.post("/upload",(req,rsp)=>{
  const form=new formidata.IncomingForm();
  //指定上传文件的绝对路径
  form.uploadDir=path.join(__dirname,"public","upload");
  //保留文件的后缀名
  form.keepExtensions=true;
  form.parse(req,(err,fields,file)=>{
    rsp.send(file.fileupload.path.split("public")[1]);
  });
});
//cookie演示
app.get("/demo1",(req,rsp)=>{
  let obj={"usernameX":req.query.username};
  rsp.cookie("oriao",JSON.stringify(obj));
  rsp.send("打开F12的APPLICATION看会话COOKIES");
});

app.get("/demo2",(req,rsp)=>{
  let obj={"usernameX":req.query.username};
  rsp.cookie("oriao",JSON.stringify(obj),{maxAge:6000*30});
  rsp.send("打开F12的APPLICATION看会话COOKIES");
});
//读取cookie

//存储是 response.cooike()
//读取是 request.cookies        借用第三方插件和中间件 cookie-parser app.use(cookie-parse())
app.get("/demo3",(req,rsp)=>{
  //读取
 let a=  JSON.parse(req.cookies.oriao);
   if(a.usernameX=="root"){
     rsp.send("老常客了");
   }else {
     rsp.send("打开F12的APPLICATION看会话COOKIES");
   }

});

//监听端口
app.listen(3000);
