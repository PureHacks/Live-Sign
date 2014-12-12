var Img = require('../../models/image');
var router = require('express').Router();


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
