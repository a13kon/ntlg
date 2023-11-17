const express = require('express');
const getBook = require('./routes/getBook');
const postBook = require('./routes/postBook');
const getBookById = require('./routes/getBookById');
const error404 = require('./middleware/err-404');


const email = {
    id : 1,
    mail : "test@mailru",
}

app = express();
app.use(express.json());

app.stor = {
    book : []
};

app.use('/api/books', getBook);
app.use('/api/books', getBookById);
app.use('/api/books', postBook);

app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);