// 控制台打印
console.log("Day 01 : 我的第一段JavaScript代码运行成功");

//变量声明
let firstName = "Jack";
let age = 20;
let isStudent = true;

console.log(firstName,age,isStudent);

//数学运算
console.log(100+100);
console.log("10"+"10");

//变量运算
let apples = 10;
let oranges = 5;

let totalFruits = apples +oranges;
console.log("总共有：",totalFruits,"个水果")

console.log(`一共有多少个水果:${totalFruits}个`);


let ratio = apples / oranges;
console.log("苹果是橙子的：",ratio,"倍")

//布尔
let hasMoney = true;

//条件判断
if(age >= 18 && hasMoney){
    console.log("恭喜，你可以买车了");
}else if(age >= 18){
    console.log("你成年了，但钱不够，先打工吧!!!")
}else{
    console.log("你未成年,先好好学习!")
}

//函数定义
function sayHello(){
    console.log("你好，我是一个小白，正在学习JavaScript！！！")
}

//函数调用
sayHello();
sayHello();