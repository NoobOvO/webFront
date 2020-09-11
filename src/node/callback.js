const getData=function (callback) {

  setTimeout(function () {
    callback({
      msg:"hello.art world !"
    })
  },2000)

}
//异步API 不同通过Return得到返回值 可以通过回调函数拿到返回值
getData(function (data) {
  console.log(data);  //拿到回调函数
});

