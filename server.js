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


app.publishCampaign = function(req, res) {
	var ml = require("./controllers/db");
	var nosql = {
		"collection": "campaigns",
		"selector" : {"_id" : ml.ObjectID(req.param("campaignID"))}
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
			res.send(200, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"campaigns": result
			});
			io.emit("publishCampaign", result)
		}
	});
};


app.getScheduledCampaings = function() {
	var ml = require("./controllers/db");

	var now = new Date();

	var nosql = {
		"collection": "schedules",
		"selector": {
			"$and": [{
				"start": {
					"$lte": now.toISOString()
				}
			}, {
				"end": {
					"$gte": now.toISOString()
				}
			}]
		}
	};

	ml.getData(nosql, function(err, result) {
		if (!err) {
			app.getCampaign(result);
		}
	});
};

app.getCampaign = function(campaigns) {
	var ml = require("./controllers/db");
	var campaignIDs = [];

	for (var i = campaigns.length - 1; i >= 0; i--) {
		campaignIDs.push({"_id" : ml.ObjectID(campaigns[i].campaignID)});
	};

	var nosql = {
		"collection": "campaigns",
		"selector" : {
			"$or": campaignIDs
		}
	};

	ml.getData(nosql, function(err, result) {
		if (!err) {
			io.emit('publishCampaign', result);		
		}
	});
};

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

app.use("/api/publishCampaign/:campaignID", app.publishCampaign);

 // need to branch out socketIO for this to work
//app.use("/api/publishCampaign/", require("./controllers/api/publishCampaign"));

app.use("/", require("./controllers/static"));


var server = app.listen(port, function() {
	console.log("listening on localhost:" + port);
});

io = require('socket.io').listen(server); // this tells socket.io to use our express server

io.sockets.on('connection', function(socket) {
	console.log('A new user connected!');

	app.getScheduledCampaings();

});
