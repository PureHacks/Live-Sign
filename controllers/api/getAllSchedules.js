var router = require("express").Router(),
	ml = require("../db");

var getSchedules = function(req, res) {
	var nosql = {
		"collection": "schedules"
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
			res.send(200, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"schedules": result
			});
		}
	});
};

router.get("/", getSchedules);

module.exports = router;