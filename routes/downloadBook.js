const express = require('express');
const router = express.Router();


router.get('/:id/download', (req, res) => {
    const {book} = app.stor;
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