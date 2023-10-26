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

    if (argv._ == "current") {
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
    }
    else if (argv._ == "add") {
        console.log("ADD");
        console.log(date);
    }
    else {
        console.log("wrong command");
    };
    