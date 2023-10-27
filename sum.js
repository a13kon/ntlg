#!/usr/bin/env node
const nums = process.argv.slice(2).map(n => +n);

const sum = nums.reduce((acc, cur) => acc + cur, 0);

console.log(`sum: ${sum}`);

f();

async function f() {
    var promise = new Promise (function (resolve, reject){
        setTimeout(() => { 
            resolve("OK");
            console.log("OK");
        }, 2000);
        
    });

    //var answer =  await promise;
    promise.then(() => {console.log("then")});
    var answer =  await promise;
    console.log("last answer");
};