const express = require('express');
const router = express.Router();
const {stor} = require('../storage/stor');
const fileMulter = require('../middleware/file');
const { v4: uuid} = require('uuid');
    
class Book {
    constructor(
        title = "", 
        description = "", 
        authors = "", 
        favorite = false, 
        fileCover = "", 
        fileName = "",
        fileBook = "",
        id = uuid()) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.authors = authors;
            this.favorite = favorite;
            this.fileCover = fileCover;
            this.fileName = fileName;
            this.fileBook = fileBook;
    };
};

router.get('/', (req, res) => {
    const {book} = stor;
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
        res.json('404 | not found'); // переделать
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
        res.json('404 | not found'); // переделать
    }
});

router.put('/:id', fileMulter.single('fileBook'), (req, res) => {
    const {book} = stor;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
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
    }
});
    
router.post('/', fileMulter.single('fileBook'),
(req, res) => {
        const {book} = stor;
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        
        const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    
        if(req.file){
            const {path} = req.file;
            newBook.fileBook = path;
        };
        
        book.push(newBook);
        
        res.status(201);
        res.json(book);
    
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