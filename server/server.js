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
require('dotenv').config()

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());
app.use(expressValidator());


var env = process.env.NODE_ENV || "local";
var config = require("./config/" + env);

startMongo(config.mongo);

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

app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to chat application."
    });
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.listen(config.PORT, () => {
    console.log("Server is listening on port " + config.PORT);
});