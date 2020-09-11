exports.ws=111;
module.exports.ws=999;
module.exports =({
  age:18
})
module.exports.kk="helloworld";
//上面第三个这种写法不对 有module.exports时,无效 如果是module.exports=({})时 会覆盖前面掉所有的变量
//exports是module.exports的别名
//当同名的exports和module.exports指向两个不同地址的对象时，module.exports优先 覆盖掉exports
