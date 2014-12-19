var express = require('express'),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	multer = require("multer"),
	app = express(),
	io;

var	port = 8888;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/layouts"));


app.use("/api/getImages", require("./controllers/api/getImages"));

app.use("/api/saveImage", require("./controllers/api/saveImage"));

// /api/deleteImage/:id
app.use("/api/deleteImage/", require("./controllers/api/deleteImage"));

app.use("/api/createCampaign", require("./controllers/api/createCampaign"));

// /api/getCampaign/:id
app.use("/api/getCampaign/", require("./controllers/api/getCampaign"));

// /api/deleteCampaign/:id
app.use("/api/deleteCampaign/", require("./controllers/api/deleteCampaign"));

app.use("/api/getAllCampaigns", require("./controllers/api/getAllCampaigns"));

app.use("/api/getAllSchedules", require("./controllers/api/getAllSchedules"));

app.use("/api/createSchedule", require("./controllers/api/createSchedule"));

// /api/deleteSchedule/:id
app.use("/api/deleteSchedule/", require("./controllers/api/deleteSchedule"));

// app.use("/api/publishCampaign/:campaignID", app.publishCampaign);

 // need to branch out socketIO for this to work
//app.use("/api/publishCampaign/", require("./controllers/api/publishCampaign"));

app.use("/", require("./controllers/static"));

var server = app.listen(port, function() {
	console.log("listening on localhost:" + port);
});

io = require('./controllers/api/activePublish');
var getScheduledCampaigns = require("./controllers/api/getScheduledCampaigns");
io.init(server);

io.getSocket().sockets.on('connection', function(socket) {
	console.log('A new user connected!');

	getScheduledCampaigns.execute();

});

var scheduler = require('./controllers/api/scheduler');

scheduler.init();