const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const {book} = app.stor;
    res.json(book);
});

module.exports = router;