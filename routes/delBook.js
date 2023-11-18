const express = require('express');
const router = express.Router();


router.delete('/:id', (req, res) => {
    const {book} = app.stor;
    const {id} = req.params;
    const idx = book.findIndex(el => el.id === id);

    if (idx !== -1) {
        book.splice(idx, 1);
    } else {
        res.status(404);
        res.json('404 | not found (del)'); //переделать на middleware
    }
});

module.exports = router;