const express = require('express');
const router = express.Router();
const { v4: uuid} = require('uuid');
const fileMulter = require('../middleware/file');


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

router.post('/', fileMulter.single('fileBook'),
(req, res) => {
        const {book} = app.stor;
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

module.exports = router;