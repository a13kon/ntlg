#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('year',{ 
        alias: "y",
        type: "boolean",
        description: "current or changeable year.",
    })
    .option('month',{ 
        alias: "m",
        type: "boolean",
        description: "current or changeable month.",
    })
    .option('date',{ 
        alias: "d",
        type: "boolean",
        description: "current or changeable date.",
    })
    .argv;

    let date = new Date();
    let result ="";
       

    switch (argv._[0]) {
        case "current":      
       
        if (argv.month == true){
            switch (date.getMonth() + 1) {
                case 1: result += `January `;
                break;
                case 2: result += `February `;
                break;
                case 3: result += `March `;
                break;
                case 4: result += `April `;
                break;
                case 5: result += `May `;
                break;
                case 6: result += `June `;
                break;
                case 7: result += `July `;
                break;
                case 8: result += `August `;
                break;
                case 9: result += `September `;
                break;
                case 10: result += `October `;
                break;
                case 11: result += `November `;
                break;
                case 12: result += `December `;
                break;
            }
        }; 
        if (argv.date == true) {
            result += `${date.getDate()} `;
        };
        if (argv.year == true) {
            result += `${date.getFullYear()} `;
        };
        if (result == "") {
            result = date;
        };
        console.log(result)
        break;
    
    case "add": (argv._ == "add") 
        if (argv.month == true && argv._[1] != undefined) {
            result = new Date(date.getFullYear(), date.getMonth() + argv._[1], date.getDate(), date.getHours(), date.getMinutes(),date.getSeconds(), date.getMilliseconds());
        } 
        else if (argv.date == true && argv._[1] != undefined) {
            result = new Date();
            result.setDate(result.getDate() + argv._[1]);
        } 
        else if (argv.year == true && argv._[1] != undefined) {
            result = new Date(date.getFullYear() + argv._[1], date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(),date.getSeconds(), date.getMilliseconds());
        }
        else {
            result = new Date();
        } 
        console.log(result);
        break;
        
    
    case "sub": (argv._ == "sub")
        if (argv.month == true && argv._[1] != undefined) {
            result = new Date(date.getFullYear(), date.getMonth() - argv._[1], date.getDate(), date.getHours(), date.getMinutes(),date.getSeconds(), date.getMilliseconds());
        } 
        else if (argv.date == true && argv._[1] != undefined) {
            result = new Date();
            result.setDate(result.getDate() - argv._[1]);
        } 
        else if (argv.year == true && argv._[1] != undefined) {
            result = new Date(date.getFullYear() - argv._[1], date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(),date.getSeconds(), date.getMilliseconds());
        }
        else {
            result = new Date();
        } 
        console.log(result);
        break;
        
    default:
        console.log("wrong command. use current, add or sub.");
        break;
    };
    