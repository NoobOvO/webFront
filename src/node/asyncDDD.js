async function f1() { //返回的是promise对象
    return "f1";
}
async function f2() {
  return "f2";
}
async function f3() {
  return "f3";
}
async function run() {
  let a1=await f1();  //await 只有返回完当前对象,才能向下执行 必须在async函数里 必须返回的是promise对象
  let a2=await f2();
  let a3=await f3();
  console.log(a1);
  console.log(a2);
  console.log(a3);
}
run();
//踩的坑   let声明一次   我返回的f1 不能在用let f1
