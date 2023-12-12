const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRouter = require('../routes/login');
const booksRouter = require('../routes/books');
const error404 = require('../middleware/err-404');
const indexRouter = require('../routes/index');


app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use(session({secret: 'SECRET'}));

app.use('/', indexRouter);
app.use('/api/books', booksRouter);
app.use('/user', userRouter);

app.use(error404);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB, {
            dbName: 'book'
        });
        app.listen(PORT, () => {
            console.log(`library is listening on port ${PORT}`);
        });
    } catch(e) {
        console.log(e);
    } 
}

const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);

