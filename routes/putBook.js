const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');

router.put('/:id', fileMulter.single('fileBook'), (req, res) => {
    const {book} = app.stor;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
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

module.exports = router;