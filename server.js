var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require("multer");
var app = express();

var	port = 8888;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var cloudinary = require("./controllers/cloudinary");

var ObjectID = require('mongodb').ObjectID,
	uri = 'mongodb://livesign:livesign@ds053190.mongolab.com:53190/heroku_app32455663',
	ml = require("mongolink");

ml.uri = uri;


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/layouts"));

app.saveImage = function(req, res) {
	var filePath = req.files.imageFileName.path;
	var fileName = req.body.friendlyName || "Image name undefined";

	cloudinary.upload(filePath, fileName, function(result){
			app.saveImageUrlToDataBase(result);
			res.redirect('/admin.html'); //where to go next
	});
};

app.saveImageUrlToDataBase = function(data) {
	var nosql = {
		"collection": "images",
		"document": data
	};

	ml.insertData(nosql, function(err, object) {
		console.log("inserting new image");
		if (err) {
			console.warn(err.message);
		} else {
			console.info("Added new image", object[0]._id);
		}
	});
};

app.getImages = function(req, res) {
	var nosql = {
		"collection": "images"
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
			res.send(200, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"images": result
			});
		}
	});
};

app.post("/api/saveImage", app.saveImage);

app.get("/api/getImages", app.getImages);

app.get("/", function (req, res) {
	if (req.err){
		console.warn(err.message);
	}
	else {
		res.status(200).redirect("/admin.html");
	}
})

app.listen(port, function() {
	console.log("listening on localhost:" + port);
});