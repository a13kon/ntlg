const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRouter = require('../routes/login');
const booksRouter = require('../routes/books');
const error404 = require('../middleware/err-404');
const indexRouter = require('../routes/index');
const http = require('http');
const socketIO = require('socket.io');


app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use(session({secret: 'SECRET'}));

app.use('/', indexRouter);
app.use('/api/books', booksRouter);
app.use('/user', userRouter);




io.on('connection', (socket) => {
    const {id} = socket;
    console.log(`Socket connected: ${id}`);

    // сообщение себе
    socket.on('message-to-me', (msg) => {
        msg.type = 'me';
        socket.emit('message-to-me', msg);
    });

    // сообщение для всех
    socket.on('message-to-all', (msg) => {
        msg.type = 'all';
        socket.broadcast.emit('message-to-all', msg);
        socket.emit('message-to-all', msg);
    });

    // работа с комнатами
    const {roomName} = socket.handshake.query;
    console.log(`Socket roomName: ${roomName}`);
    socket.join(roomName);
    socket.on('message-to-room', (msg) => {
        msg.type = `room: ${roomName}`;
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

app.use(error404);

async function start(PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB, {
            dbName: 'library-storage'
        });
        server.listen(PORT, () => {
            console.log(`library is listening on port ${PORT}`);
        });
    } catch(e) {
        console.log(e);
    } 
}

const UrlDB = process.env.UrlDB;
const PORT = process.env.PORT || 3000;
start(PORT, UrlDB);

