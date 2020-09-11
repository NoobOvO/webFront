const path=require("path");
const myPath=path.join("aaa","bbb","ccc","ddd","aha");
// aaa\bbb\ccc\ddd\aha        这个方法会自动判断当前的操作系统,并给分隔符 默认window /\都可以 linux只有/ 拼接后的路径
console.log(myPath);
