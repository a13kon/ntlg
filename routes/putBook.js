const express = require('express');
const router = express.Router();

router.put('/:id', (req, res) => {
    const {book} = app.stor;
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
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
            fileName,
            fileBook 
        }; 
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | not found');
    }


});

module.exports = router;