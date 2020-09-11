//连接服务器
let http=require("http");
let app=http.createServer();
let url=require("url");
let querystring=require("querystring");


require("./model/index");
let userModel=require("./model/user"); //将代码分离成模块 一个工能一个模块


app.on("request",async (req,rsp)=>{
  let method=req.method;//请求方式 GET POST
  let {pathname,query}=url.parse(req.url,true);  //queryj就是把url ?后面的参数转换为对象
  if(method=="GET"){
        if(pathname=="/list"){
           let userall=await  userModel.find();
           console.log(userall);

          let list='<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '  <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css">\n' +
            '    <title>Title</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '\n' +
            '<div class="container">\n' +
            '  <h5 ><a href="/add" class="btn btn-primary">添加用户</a></h5>\n' +
            '  <table class="table table-hover">\n' +
            '    <tr>\n' +
            '      <td>用户名</td>\n' +
            '      <td>年龄</td>\n' +
            '      <td>爱好</td>\n' +
            '      <td>邮箱</td>\n' +
            '      <td>操作</td>\n' +
            '    </tr>';
            userall.forEach(function (item) {
              list+='<tr>\n' +
                '      <td>'+item.name+'</td>\n' +
                '      <td>'+item.age+'</td>\n' +
                '      <td>\n' +item.hobbies.join(" ")+"";

               list+= ` </td><td>${item.email}</td>
                    <td>
                     <a href="/delete?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                     <a href= "/modify?id=${item._id}"   class="btn btn-success btn-xs">修改</a>
                    </td> 
                   </tr>`;
            });

     list+='</table>\n' +
       '</div>\n' +
       '\n' +
       '</body>\n' +
       '</html>';
          rsp.end(list);//显示信息
        }//显示全部信息
        if(pathname=="/add"){
           let add='<!DOCTYPE html>\n' +
             '<html lang="en">\n' +
             '<head>\n' +
             '    <meta charset="UTF-8">\n' +
             '  <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css">\n' +
             '    <title>add</title>\n' +
             '</head>\n' +
             '<body>\n' +
             '  <div class="container">\n' +
             '    <h1>添加用户</h1>\n' +
             '    <form action="/add" method="post">\n' +
             '      <div class="form-group">\n' +
             '        <label >用户名</label>\n' +
             '        <input type="text" class="form-control"  placeholder="UserName" name="name">\n' +
             '      </div>\n' +
             '      <div class="form-group">\n' +
             '        <label >密码</label>\n' +
             '        <input type="text" class="form-control"  placeholder="Password" name="password">\n' +
             '      </div>\n' +
             '      <div class="form-group">\n' +
             '        <label >年龄</label>\n' +
             '        <input type="text" class="form-control"  placeholder="Age" name="age">\n' +
             '      </div>\n' +
             '      <div class="form-group">\n' +
             '        <label >邮箱</label>\n' +
             '        <input type="text" class="form-control"  placeholder="E-mail" name="email">\n' +
             '      </div>\n' +
             '      <div class="checkbox">\n' +
             '        <h5 style="font-weight: bolder">请选择爱好</h5>\n' +
             '        <label>\n' +
             '          <input type="checkbox" name="hobbies" value="篮球"> 篮球 &nbsp&nbsp&nbsp&nbsp&nbsp\n' +
             '          <input type="checkbox" name="hobbies" value="足球"> 足球 &nbsp&nbsp&nbsp&nbsp&nbsp\n' +
             '          <input type="checkbox" name="hobbies" value="射击"> 射击 &nbsp&nbsp&nbsp&nbsp&nbsp\n' +
             '          <input type="checkbox" name="hobbies" value="敲代码"> 敲代码 &nbsp&nbsp&nbsp&nbsp&nbsp\n' +
             '          <input type="checkbox" name="hobbies" value="烫头"> 烫头 &nbsp&nbsp&nbsp&nbsp&nbsp\n' +
             '          <input type="checkbox" name="hobbies" value="跑步"> 跑步 &nbsp&nbsp&nbsp&nbsp&nbsp\n' +
             '        </label>\n' +
             '      </div>\n' +
             '      <button type="submit" class="btn btn-primary">添加用户</button>\n' +
             '    </form>\n' +
             '  </div>\n' +
             '</body>\n' +
             '</html>\n';


        rsp.end(add);
        }//添加页面
        if(pathname=="/modify"){
             //取参数ID
             let userById=await userModel.findOne({_id:query.id});
             let hobbies=["篮球","足球","射击","敲代码","烫头","跑步"];

          let modify=`<!DOCTYPE html> 
            <html lang="en"> 
            <head> 
                <meta charset="UTF-8">
              <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css">
                <title>add</title>
            </head>
            <body>
              <div class="container">
                <h1>修改用户</h1>
                <form action="/modify?id=${userById._id}" method="post">
                  <div class="form-group">
                    <label >用户名</label>
                   <input type="text" class="form-control"  placeholder="UserName" name="name" value="${userById.name}">
                  </div>
                 <div class="form-group">
                   <label >密码</label>
                    <input type="text" class="form-control"  placeholder="Password" name="password" value="${userById.password}">
                  </div>
                  <div class="form-group">
                    <label >年龄</label>
                    <input type="text" class="form-control"  placeholder="Age" name="age" value="${userById.age}">
                  </div>
                  <div class="form-group">
                   <label >邮箱</label>
                   <input type="text" class="form-control"  placeholder="E-mail" name="email" value="${userById.email}">
                  </div>
                  <div class="checkbox">
                    <h5 style="font-weight: bolder">请选择爱好</h5>
                    <label> `;

                   hobbies.forEach(function (item) {
                    let flag= userById.hobbies.includes(item);
                    if(flag){
                      modify+=`<input type="checkbox" name="hobbies" value="${item}" checked> ${item} &nbsp&nbsp&nbsp&nbsp&nbsp`;
                    }else {
                      modify+=`<input type="checkbox" name="hobbies" value="${item}" > ${item} &nbsp&nbsp&nbsp&nbsp&nbsp`;
                    }
                   });

                  modify+= `</label>
                 </div>
                  <button type="submit" class="btn btn-primary">修改用户</button>
               </form>
              </div>
            </body>
           </html>`;





          rsp.end(modify);
        }//修改信息
        if(pathname=="/delete"){
          await userModel.deleteOne({_id:query.id});
          rsp.writeHead(301,{Location:"/list"});//重定向
          rsp.end();//必须有end 否则会不停地请求
        } //删除功能


  }else if(method=="POST"){
             if(pathname=="/add"){
               //添加操作
               let paramsData='';
               //接受参数的事件
               req.on("data",function (item) {
                 paramsData+=item;
               });
               //接受完参数进行处理
               req.on("end",async function () {
                let params= querystring.parse(paramsData);  //将接受的参数转换为对象
                await userModel.create(params);
               });
                 rsp.writeHead(301,{Location:"/list"});//重定向
                 rsp.end();//必须有end 否则会不停地请求
             }
             if(pathname=="/modify"){
               //修改操作
               let paramsData='';
               //接受参数的事件
               req.on("data",function (item) {
                 paramsData+=item;
               });
               //接受完参数进行处理
               req.on("end",async function () {
                 let params= querystring.parse(paramsData);
                 await userModel.updateOne({_id:query.id},params);
               });
               rsp.writeHead(301,{Location:"/list"});//重定向
               rsp.end();//必须有end 否则会不停地请求

             }


  }


});


app.listen(3000);
