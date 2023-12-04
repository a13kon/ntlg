const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        getBook: "GET api/books",
        getBookById: "GET api/books/:id",
        postBook: " POST api/books/:id",
        putBook: "PUT api/books/:id",
        deleteBook: "DELETE api/books/:id",
        downloadBook: "GET api/books/:id/download"
    });
});

module.exports = router;