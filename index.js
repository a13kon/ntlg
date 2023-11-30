// переделать для API
const express = require('express');
const userRouter = require('./routes/login');
const booksRouter = require('./routes/books');
const error404 = require('./middleware/err-404');
const indexRouter = require('./routes/index');

app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.stor = {
    book : []
};


app.use('/', indexRouter);
app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);