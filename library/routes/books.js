const express = require('express');
const router = express.Router();
const {stor} = require('../storage/stor');
const fileMulter = require('../middleware/file');
const {Book} = require('../storage/bookClass');



router.get('/', (req, res) => {
    const {book} = stor;
    res.json(book);
});

router.post('/', fileMulter.single('fileBook'),
(req, res) => {
        const {book} = stor;
        const {title, desc, authors, favorite, fileCover, fileName} = req.body;
        const newBook = new Book(title, desc, authors, favorite, fileCover, fileName);
    
        if(req.file){
            const {path} = req.file;
            newBook.fileBook = path;
        };
        
        book.push(newBook);
        
        res.status(201);
        res.json(book);
    
});

router.get('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex( el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | not found');
    }
});

router.put('/:id', fileMulter.single('fileBook'), (req, res) => {
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
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | not found');
    }
});

router.delete('/:id', (req, res) => {
    const {book} = stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
        res.json('deleted');
    } else {
        res.status(404);
        res.json('404 | not found');
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
        res.json('404 | not found')
    }
});

module.exports = router;