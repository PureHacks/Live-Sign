var router = require("express").Router(),
	ml = require("../db");

var getImages = function(req, res) {
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

router.get("/", getImages);

module.exports = router;