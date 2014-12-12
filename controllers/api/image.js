var Image = require('../../models/image');
var router = require('express').Router();


router.get('/api/images', function (req, res, next) {

});

router.post('/api/images', function(req, res, next) {

	var cloud = require("../cloudinary");

	var result = cloud.upload(req.image);

	if (result !== false && result.url) {
		var image = new Image({
			filename: req.filename,
			url: result.url
		});
		
		post.save(function(err, image){
			if (err) {
				console.log("errrrorr");
				return next(err);
			}
			res.status(201).json(image);
		})
	}
	else {
		console.log("errorz");
	}
	
});
