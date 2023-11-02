const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'demo', 'new.txt')

const readerStream = fs.createReadStream('package.json');

let data;
readerStream
.setEncoding('UTF8')
.on('data', (chank)=> {
    data += chank;
})
.on('end', () => {
    console.log('end\n', data)
});

const content = 'content';

const writeStr = fs.createWriteStream('output.txt');
writeStr.write(content, 'UTF8');
writeStr.end()

writeStr.on('finish', () => {
    console.log('finish');
});

writeStr.on('close', () => {
    console.log('close');
});

writeStr.on('error', () => {
    console.log('error');
});

let readStr1 = fs.createReadStream('package.json');
let writeStr2 = fs.createWriteStream('output.txt');

readStr1.pipe(writeStr2);