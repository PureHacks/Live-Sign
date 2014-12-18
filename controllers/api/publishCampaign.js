var router = require("express").Router(),
	ml = require("../db");

var publishCampaign = function(req, res) {
	var nosql = {
		"collection": "campaigns",
		"selector" : {"_id" : ml.ObjectID(req.param("campaignID"))}
	};
	console.log("publish campaign!");
	
	ml.getData(nosql, function(err, result) {
		if (err) {
			res.send(200, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"campaigns": result
			});
			io.emit("publishCampaign", result)
		}
	});
};

router.get("/:campaignID", publishCampaign);

module.exports = router;