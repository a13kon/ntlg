const express = require('express');

const logger = require('./middleware/logger');
const indexRouter = require('./routes/index');
const testRouter = require('./routes/testRoute');
const error404 = require('./middleware/err-404');

const app = express();

app.use(logger);

app.use('/', indexRouter);
app.use('/test', testRouter);

app.use(error404);



const PORT = process.env.PROT || 3000;
app.listen(PORT);