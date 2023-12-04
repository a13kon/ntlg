const express = require ('express');
const router = express.Router();

let test = 0;

router.get('/:bookId', (req, res) => {
    const { bookId } = req.params;
    res.json(`book ID is ${test}`);
});

router.post('/:bookId/incr', (req, res) => {
    test++;
    res.status(201);
});

module.exports = router;