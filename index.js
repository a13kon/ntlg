#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
const { match } = require('assert');
const fs = require('fs');
const path = require('path');
const argv = yargs(hideBin(process.argv)).argv;

const regExp = /\*|\\|\/|:|\?|"|<|>|\|/g;

try{
    if (argv._[0] != undefined) {
        let file = String(argv._[0]);
        file = file.replace(regExp, '');

        if (file.length > 100) {
            file = file.slice(0, 100);
        } ;

        while(file[file.length-1] == '+') {
            file = file.slice(0, -1);
        };
        if (file == '') {
            throw new Error("Некорректное имя файла.");
        } else {
            file = file + '.txt';
        };
        
        fs.writeFile(file, '', (err) => {
            if (err) throw new Error("Ошибка при создании файла");
        });

        let num, msg, content;

        console.log("Орел или решка? (Орел - 1, решка - 2, выход - stop)");

        readline.on('line',(input) => {
            num = Number(Math.random() > 0.5) + 1;
            if (input == 1 ||input == 2) {
                if (input == num) {
                    content = 'win, \n';
                    msg = 'Победа! Орел или решка?';
                } else {
                    content = 'lose, \n';
                    msg = 'Поражение. Орел или решка?';
                };
            } else if (input == 'stop'){
                content = 'end\n';
                msg = '';
                readline.close();
            } else {
                content = ''
                msg = 'Неправильный ввод. (Орел - 1, решка - 2, выход - stop)\nОрел или решка?';
            };
            fs.appendFile(file, content, (err) => {
                if (err) throw new Error("Ошибка при записи лога");
            });
            console.log(msg);
        });
    } else readline.close();
} catch (e) {
    console.log(e.message);
}