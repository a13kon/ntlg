const express = require('express');
const getBook = require('./routes/getBook');
const postBook = require('./routes/postBook');
const getBook2 = require('./routes/getBook2');




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
app.use('/api/books', getBook2);
app.use('/api/books', postBook);


const PORT = process.env.PORT || 3000;
app.listen(PORT);