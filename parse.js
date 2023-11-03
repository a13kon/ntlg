#!/usr/bin/env node


const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const fs = require('fs');
const path = require('path');
const argv = yargs(hideBin(process.argv)).argv;


if (argv._[0] != undefined) {
    let file = String(argv._[0] + '.txt');
        fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log("Ошибка чтения файла.")
            throw new Error(err);
        }
        let logArr = data.split(':')
        let winCount = logArr.reduce((acc, val) => {if (val == 'win') acc += 1; return acc}, 0);
        console.log(`Всего партий: ${logArr.length-1}\nПобед: ${winCount}, поражений ${logArr.length - 1 - winCount}\nПроцент побед: ${(( winCount / (logArr.length - 1)) * 100).toFixed(1)}%`);
    });
}
