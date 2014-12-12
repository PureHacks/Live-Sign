
var router = require('express').Router();

var ml =  require('mongolink');


router.get('/api/images', function (req, res, next) {

});

var handler = function(err, object) {
	console.log("inserting new image");
	if (err) {
		console.warn(err.message);
		res.send(200, {
			"error": "Could not insert image." + err.message
		});
	} else {
		console.info("Added new image");
		res.send(200, {
			"ok": "Added new user"
		});
	}
});

router.post('/api/images', function(req, res, next) {

	var cloud = require("../cloudinary");

	var result = cloud.upload(req.image);

	if (result !== false && result.url) {
		var image = new Image({
			filename: req.filename,
			url: result.url
		});
		ml.insertData(image, handler);
		
	}
	else {
		console.log("errorz");
	}
	
});
