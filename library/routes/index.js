const express = require('express');
const router = express.Router();

const request = require('request');

router.get('/', (req, res) => {
    request(
        'http://localhost:3001/myname',
        (err, response, body) => {
            if (err) 
                return res
                    .status(500)
                    .json(`error ${err}`);

        return res.json(body);

        }
    );

    // res.json({
    //     getBook: "GET api/books",
    //     getBookById: "GET api/books/:id",
    //     postBook: " POST api/books/:id",
    //     putBook: "PUT api/books/:id",
    //     deleteBook: "DELETE api/books/:id",
    //     downloadBook: "GET api/books/:id/download"
    // });
});

module.exports = router;