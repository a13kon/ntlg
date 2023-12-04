const express = require('express');
const counter = require('../routes/counter');


app = express();

app.use('/counter', counter);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`counter is listening on port ${PORT}`)
}); 