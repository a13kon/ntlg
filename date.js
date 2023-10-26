#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('year',{ 
        alias: "y",
        type: "boolean",
        description: "current year",
        default: "false"
    })
    .option('month',{ 
        alias: "m",
        type: "boolean",
        description: "current month",
        default: "false"
    })
    .option('date',{ 
        alias: "d",
        type: "boolean",
        description: "current date",
        default: "false"
    })
    .argv;

    let date = new Date();
       
    console.log(argv._);

    switch (argv._[0]) {
        case "current":
        console.log("CURRENT");
        if (argv.year == true) {
            date = date.getFullYear();
        }
        else if (argv.month == true){
            date = date.getMonth();
        } 
        else if (argv.date == true) {
            date = date.getDate();
        } else {
            date = date.toISOString();
        }
        console.log(date)
        break;
    
    case "add": (argv._ == "add") 
        console.log("ADD");
        console.log(date, argv._[1]);
        break;
    
    default:
        console.log("wrong command");
        break;
    };
    