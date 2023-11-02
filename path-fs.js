const fs = require('fs');
const path = require('path');

// console.log(path.parse(__filename));
// console.log(path.join(__filename, 'test', '..', '//demo.txt'));

const dir = path.join(__dirname, 'demo');

//создание директории
fs.mkdir(dir, (err) => {
    try {
        if (err) throw Error(err);
        console.log('ok');
    } catch (e) {
        if (err.errno == -4075) console.log('file already exist');
        else console.log(err);
    }
})

const file = path.join(__dirname, 'demo', 'new.txt');
const content = 'new content \n';

//создание файла
fs.writeFile(file, content, (err) => {
        if (err) throw Error(err);
        console.log('ok');
})

//дозапись в файл
fs.appendFile(file, content, (err) => {
    if (err) throw Error(err);
    console.log('ok');
})

//чтение файла
fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw Error(err);
   
    console.log(data);
})