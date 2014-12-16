var express = require('express'),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	multer = require("multer"),
	app = express();

var	port = 8888;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/layouts"));


app.use("/api/saveImage", require("./controllers/api/saveImage"));

app.use("/api/getImages", require("./controllers/api/getImages"));

app.use("/api/createCampaign", require("./controllers/api/createCampaign"));

app.use("/api/getCampaigns", require("./controllers/api/getCampaigns"));

app.use("/", require("./controllers/static"));


var server = app.listen(port, function() {
	console.log("listening on localhost:" + port);
});


var io = require('socket.io').listen(server); // this tells socket.io to use our express server

io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});