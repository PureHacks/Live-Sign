var express = require('express');
var bodyParser = require("body-parser");
var busboy = require('connect-busboy');
var app = express(),
	port = 8888;

var ObjectID = require('mongodb').ObjectID,
	uri = 'mongodb://livesign:livesign@ds053190.mongolab.com:53190/heroku_app32455663',
	ml = require("mongolink");

ml.uri = uri;

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/layouts"));

app.use(busboy({
	immediate: true
}));

app.saveImage = function(req, res) {
	console.log("busboy");

	req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

		console.log(fieldname, filename, encoding, mimetype);
		console.log("Uploading: " + filename);

		var fs = require("fs");

		//Path where image will be uploaded
		fstream = fs.createWriteStream(__dirname + '/tmp/' + filename);
		file.pipe(fstream);

		fstream.on('close', function() {
			console.log("Upload Finished of " + filename);

			var cloudinary = require('cloudinary');

			cloudinary.config({
				cloud_name: 'mattmcfad',
				api_key: '339735699794268',
				api_secret: 'ecRVlmjdaXTG1mX1DcJm7sMp6Pg'
			});

			var filepath = __dirname + "/tmp/" + filename;

			cloudinary.uploader.upload(filepath, function(result) {
				console.log(result);
				if (result.error) {
					console.log(result.error.message);
				} else {
					app.saveImageUrlToDataBase(result);
				}
				res.redirect('back'); //where to go next
			})
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

app.listen(port, function() {
	console.log("listening on localhost:" + port);
});