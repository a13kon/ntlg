const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/:name', (req, res) => {
    const { name } = req.params;
    res.json(`Your name is ${name}`);
});

app.listen(PORT, () => {
    console.log(`counter is listening on port ${PORT}`)
});