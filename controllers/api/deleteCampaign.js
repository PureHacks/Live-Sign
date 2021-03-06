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
			console.log("error:" + nosql);
			res.send(403, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			res.send(200, {
				"result": result
			});
		}
	});
};

router.delete("/:campaignID", deleteCampaign);

module.exports = router;