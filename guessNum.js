#!/usr/bin/env node

module.exports = function guess() {

const { match } = require('assert');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let debug;
const num = Math.floor(Math.random() * 100);
var msg = "Загадано число в диапазоне от 0 до 100";
console.log(msg);

readline.on('line',(input) => {
    if (Number.isInteger(+input)){
        if (input > num) {
            msg = "Больше";
        }
        else if (input < num) {
            msg = "Меньше";
        }
        else {
            msg = `Отгадано число ${num}`;
            readline.close();
        }
       
    }
    else if (input == "end"){
        msg = `Было загадано число ${num}`;
        readline.close();
    }
    else {
        msg = "Введите целое число. Для выхода введите end.";
        
    }
    console.log(msg);
})
};