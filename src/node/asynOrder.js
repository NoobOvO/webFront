console.log("同步代码开始执行");
setTimeout(function () {
  console.log("异步代码2S后执行");
},2000);
setTimeout(function () {
  console.log("异步代码0S后执行");
},0);
console.log("同步代码结束执行");
/* 执行结果为                                                 同步代码执行区 异步代码执行区 回调函数队列
同步代码开始执行
同步代码结束执行
异步代码0S后执行
异步代码2S后执行
 */
