var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var busboy = require('connect-busboy');
var multer = require("multer");
var app = express(),
	port = 8888;

	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(multer()); // for parsing multipart/form-data

var cloudinary = require("./public/controllers/cloudinary");

var ObjectID = require('mongodb').ObjectID,
	uri = 'mongodb://livesign:livesign@ds053190.mongolab.com:53190/heroku_app32455663',
	ml = require("mongolink");

ml.uri = uri;


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/layouts"));

app.use(busboy({
	immediate: true
}));

app.saveImage = function(req, res) {

	console.log(req.files, req.body, req.body.friendlyName);

	var friendlyName = req.body.friendlyName || "Image name undefined";


	req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		console.log(req.busboy);
		console.log(fieldname, filename, encoding, mimetype);
		console.log("Uploading: " + filename);

		//Path where image will be uploaded
		fstream = fs.createWriteStream(__dirname + '/tmp/' + filename);
		file.pipe(fstream);

		fstream.on('close', function() {
			console.log("Uploaded to NODE server finished: " + filename);

			var filepath = __dirname + "/tmp/" + filename;
			cloudinary.upload(filepath);

		});

		// res.status(200).send("<h2>"+filename+"</h2>");
	});

	req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {

	});

	req.pipe(req.busboy);
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