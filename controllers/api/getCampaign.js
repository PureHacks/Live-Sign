var router = require("express").Router(),
	ml = require("../db");

var getCampaign = function(req, res) {
	var nosql = {
		"collection": "campaigns",
		"selector" : {"_id" : ml.ObjectID(req.param("campaignID"))}
	};
	console.log("Getting campaign: ", nosql.selector._id);

	ml.getData(nosql, function(err, result) {
		if (err) {
			res.send(200, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"campaign": result
			});
			
		}
	});
};

router.get("/:campaignID", getCampaign);

module.exports = router;