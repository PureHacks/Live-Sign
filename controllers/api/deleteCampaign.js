var router = require("express").Router(),
	ml = require("../db");

var deleteCampaign = function(req, res) {
	var nosql = {
		"collection": "campaigns",
		"selector" : {"_id" : ml.ObjectID(req.param("campaignID"))}
	};
	console.log("Deleting campaign: ", nosql.selector._id);

	ml.deleteData(nosql, function(err, result) {
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

router.get("/:campaignID", deleteCamapign);

module.exports = router;