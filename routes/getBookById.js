const express = require('express');
const router = express.Router();


router.get('/:id', (req, res) => {
    const {book} = app.stor;
    const {id} = req.params;
    const idx = book.findIndex( el => el.id === id);

    if (idx !== -1) {
        res.json(book[idx]);
    } else {
        res.status(404);
        res.json('404 | not found'); 
    }

});

module.exports = router;