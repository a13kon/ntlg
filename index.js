const express = require('express');
const getBook = require('./routes/getBook');
const postBook = require('./routes/postBook');
const getBookById = require('./routes/getBookById');
const delBook = require('./routes/delBook');
const putBook = require('./routes/putBook');
const postLogin = require('./routes/postLogin');
const downloadBook = require('./routes/downloadBook');
const error404 = require('./middleware/err-404');




app = express();
app.use(express.json());

app.stor = {
    book : []
};

//app.use('/download', express.static(__dirname+'/booksFiles/1700388269561-book.png'));

app.use('/api/user/login', postLogin);
app.use('/api/books', getBook);
app.use('/api/books', getBookById);
app.use('/api/books', delBook);
app.use('/api/books', putBook);
app.use('/api/books', postBook);
app.use('/api/books', downloadBook);

app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);