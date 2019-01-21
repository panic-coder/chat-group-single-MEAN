const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
var http = require('http');
var server = http.Server(app);
var socketIO = require('socket.io');
var io = socketIO(server);


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

function startMongo(mongoObj) {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(mongoObj, {
        useNewUrlParser: true
    });
    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb on %s", mongoObj);
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

startMongo("mongodb://localhost:27017/chatGroupSingle");

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
