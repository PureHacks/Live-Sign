var router = require("express").Router(),
	ml = require("../db");

var getCampaigns = function(req, res) {
	var nosql = {
		"collection": "campaigns"
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
			res.send(200, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"campaigns": result
			});
		}
	});
};

router.get("/", getCampaigns);

module.exports = router;