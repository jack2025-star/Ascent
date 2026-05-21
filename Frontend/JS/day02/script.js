'use strict'; //严格模式

function logger(){
    console.log("My name is Jack");
}

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


function add(a,b){
    return a+b;
}

const addNum = add(5,10);
console.log(`值为${addNum}`)



