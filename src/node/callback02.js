function getData(callback) {
  callback("123");
}
//回调函数的调用
getData(function (n) {
  console.log("你好啊");
  console.log(n);
})
