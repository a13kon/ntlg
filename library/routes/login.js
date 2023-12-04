const express = require('express');
const router = express.Router();

const email = {
    id : 1,
    mail : "test@mailru",
};

router.post('/login', (req, res) => {
    res.status(201);
    res.json(email);
});

module.exports = router;