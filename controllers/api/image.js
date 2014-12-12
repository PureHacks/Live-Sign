var Img = require('../../models/image');
var router = require('express').Router();

var cloud = require('../controllers/cloudinary');


cloud.upload("http://i.imgur.com/iZo1Qa8.gif");

router.get('/api/image', function (req, res, next) {

});

router.post('/api/images', function(req, res, next) {
	
	var image = new Image({
		
	});
	
	post.save(function(err, post){
		if (err) {
			console.log("fac");
			return next(err);
		}
		res.status(201).json(post);
	})
});
