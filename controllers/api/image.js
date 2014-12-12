//var Image = require('../../models/image');
var router = require('express').Router();

var ml =  require('mongolink');


router.get('/api/images', function (req, res) {
	console.log(req.body);
	res.send("<h1>" + req.body + "test</h1>");
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
};

router.post('/api/images', function(req, res) {

	var cloud = require("../cloudinary");

	var result = cloud.upload(req.body.image);
	console.log(req.body, req.body.image, req.body.imagename, req.imagename, result);

	if (result !== false && result.url) {
		var image = {
			filename: req.body.imagename,
			url: result.url,
			date: Date.now
		};
		ml.insertData(image, handler);
		
	}
	else {
		console.log("errorz");
	}
	
});


module.exports = router;
