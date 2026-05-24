'use strict'; //严格模式

//定义函数
function logger(){
    console.log("My name is Jack");
}

//调用函数
logger();

//函数表达式
const calcAge = function(birthYear){
    return 2026 - birthYear;
}

const age = calcAge(1996);
console.log(age);


function fruitProcessor(apples,oranges){
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5,0);
console.log(appleJuice);

//两数相加的功能函数
function add(a,b){
    return a+b;
}

const addNum = add(5,10);
console.log(`值为${addNum}`)


//箭头函数
//特点：函数只有一个参数时，括号可省略
const calcAge2 = birthYear => 2026 - birthYear;

//箭头函数实现两数相加
const add2 =(a,b) => a+b;

let num = add2(5,10)
console.log(`箭头函数的值为:${num}`)



//函数调用函数
function cutFruitPieces(fruit) {
    return fruit * 4; // 每个水果切4块
  }

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
  }
  
console.log(fruitProcessor(2, 3));



