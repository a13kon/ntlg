#!/usr/bin/env node

const http = require('http');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
require('dotenv').config();

const argv = yargs(hideBin(process.argv)).argv;

const myAPIKey = process.env.myAPIKey;

const [city] = argv._;
const url =`http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`;

http.get(url, (res) => {
    const {statusCode} = res;
    if (statusCode !== 200) {
        console.log(`status: ${statusCode}`);
        return;
    }

    res.setEncoding('utf8');
    let rowData = '';
    res.on('data', (chunk) => rowData = chunk);
    res.on('end', () => {
        let parseData = JSON.parse(rowData);
        //console.log(parseData);
        console.log(`city: ${parseData.location.name}\ncountry: ${parseData.location.country}\ntemp: ${parseData.current.temperature}\nfeels like: ${parseData.current.feelslike}\ndescription: ${parseData.current.weather_descriptions}`);
        
    });
}).on('error', (err) => {
    console.error(err);
});