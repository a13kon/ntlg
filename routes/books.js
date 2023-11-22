const express = require('express');
const router = express.Router();
const {stor} = require('../storage/stor');
const fileMulter = require('../middleware/file');
const {Book} = require('../storage/bookClass');



router.get('/', (req, res) => {
    const {book} = stor;
    res.render("books/index", {
        title: "Книги",
        books: book,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание записи",
        book: {},
    });
});

router.post('/create', fileMulter.single('fileBook'),
(req, res) => {
        const {book} = stor;
        const {title, desc, authors, favorite, fileCover, fileName} = req.body;
        //console.log(req.body);
        const newBook = new Book(title, desc, authors, favorite, fileCover, fileName);
    
        if(req.file){
            const {path} = req.file;
            newBook.fileBook = path;
        };
        
        book.push(newBook);
        
        res.redirect('/api/books');
    
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex( el => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {
            title: "Информация о книге",
            book: book[idx],
        });
    } else {
        res.redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex( el => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {
            title: "Редактор информации",
            book: book[idx],
        });
    } else {
        res.redirect('/404');
    }
});

router.post('/update/:id', fileMulter.single('fileBook'), (req, res) => {
    const {book} = stor;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {

        if(req.file){
            const {path} = req.file;
            book[idx].fileBook = path;
        };

        book[idx] = {
            ...book[idx],
            title,
            desc,
            authors,
            favorite,
            fileCover,
            fileName
        }; 
        res.redirect(`/api/books/${id}`);
    } else {
        res.redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.redirect('/api/books')
    } else {
        res.redirect('/404');
    }
});    

router.get('/:id/download', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);
    
    if (idx !== -1 && book[idx].fileBook !== "") {
        res.download(book[idx].fileBook);
    } else {
        res.status(404);
        res.json('404 | not found');
    }
});

module.exports = router;