#!/usr/bin/env node

const { match } = require('assert');
const readlineSync = require('readline-sync');

const num = Math.floor(Math.random() * 100);
var answer;
var msg = "Загадано число в диапазоне от 0 до 100";

console.log(msg);
while (answer != num) {
    answer = readlineSync.question();
    if (answer > num) {
        msg = "Больше";
    }
    else if (answer < num) {
        msg = "Меньше";
    }
    else {
        msg =`Отгадано число ${num}`;
    }
    console.log(msg);
};  


// console.log("Загадано число в диапазоне от 0 до 100\n" + result);
// while (result!= num) {
//     rl.question(msg, (answer) => {
//         if (Number.isInteger(answer)) {
            
//         } 
//         else {
//             console.log("Введите целое число!"); 
//         }
//         rl.close();
//     });
// };
