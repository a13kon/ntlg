const express = require('express');
// const getBook = require('./routes/getBook');
// const postBook = require('./routes/postBook');
// const getBookById = require('./routes/getBookById');
// const delBook = require('./routes/delBook');
// const putBook = require('./routes/putBook');
const userRouter = require('./routes/login');
// const downloadBook = require('./routes/downloadBook');
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
// app.use('/api/books', getBook);
// app.use('/api/books', getBookById);
// app.use('/api/books', delBook);
// app.use('/api/books', putBook);
// app.use('/api/books', postBook);
// app.use('/api/books', downloadBook);

app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);