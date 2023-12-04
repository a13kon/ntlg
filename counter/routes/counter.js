const express = require ('express');
const router = express.Router();

router.get('/:bookId', (req, res) => {
    const { bookId } = req.params;
    res.json(`book ID is ${bookId}`);
});


module.exports = router;