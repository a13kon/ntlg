const express = require('express');

const logger = require('./middleware/logger');
const indexRouter = require('./routes/index');
const testRouter = require('./routes/testRoute');
const demoRouter = require('./routes/demo');
const error404 = require('./middleware/err-404');

const app = express();

app.use(logger);


app.use('/public', express.static(__dirname+'/public'));
app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/demo', demoRouter);

app.use(error404);



const PORT = process.env.PROT || 3000;
app.listen(PORT);
