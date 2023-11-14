const express = require('express');
const { v4: uuid} = require('uuid');

class Book {
    constructor(
        title = "", 
        description = "", 
        authors = "", 
        favorite = "", 
        fileCover = "", 
        fileName = "",
        id = uuid()) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.authors = authors;
            this.favorite = favorite;
            this.fileCover = fileCover;
            this.fileName = fileName;
    };
};

const stor = {
    book : [],
};

const email = {
    id : 1,
    mail : "test@mailru",
}

const app = express();
app.use(express.json());


app.post('/api/user/login/', (req, res) => {
    res.status(201);
    res.json(email);
});

app.get('/api/books/', (req, res) => {
    const {book} = stor;
    res.json(book);
});

app.get('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | not found');
    };
});

app.post('/api/books/', (req, res) => {
    const {book} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    book.push(newBook);

    res.status(201);
    res.json(book);
});

app.put('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };

        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | not found');
    };
});

app.delete('/api/books/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.slice(idx, 1);
    } else {
        res.status(404);
        res.json('404 | not found');
    };
});



const PORT = process.env.PORT || 3000;
app.listen(PORT);