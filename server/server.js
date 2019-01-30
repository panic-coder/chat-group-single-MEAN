const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const http = require('http');
const server = http.Server(app);
const socketIO = require('socket.io');
const io = socketIO(server);
// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// var http = require('http');
// var server = http.Server(app);
// var socketIO = require('socket.io');
// var io = socketIO(server);
const userRoutes = require('./routes/user.routes');
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(expressValidator());
app.use('/', userRoutes);

var env = process.env.NODE_ENV || "local";
var config = require("./config/" + env);

mongoose.Promise = global.Promise;

function startMongo(mongoObj) {
    mongoose.set(mongoObj.createIndex);
    mongoose.connect(mongoObj.url, mongoObj.options);
    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb on %s", mongoObj.url);
    })
    mongoose.connection.on("error", (err) => {
        if (err) {
            console.log("not connected to mongodb due to %s", err);
            process.exit();
        }
    })
}
// console.log(io);

// app.get('/', (req, res) => {
//     res.json({
//         "message": "Welcome to chat application."
//     });
// });
// const io = require('socket.io')(server);

// io.on('connection', function (socket) {
//     console.log('a user connected');
//     socket.on('connect', function(){
//         console.log("connected");
//     });
//     socket.on('event', function(data){
//         console.log("connected data");
//     });
//     socket.on('disconnect', function(){
//         console.log("disconnected");
//     });
// });

io.on('connection', function (socket) {

    console.log('Client connected.');

    // Disconnect listener
    socket.on('disconnect', function () {
        console.log('Client disconnected.');
    });
    socket.on('new-message', (message) => {
        console.log(message);
        io.emit('chat message', message);
    });

});

server.listen(config.PORT, () => {
    console.log("Server is listening on port " + config.PORT);
    startMongo(config.mongo);
});