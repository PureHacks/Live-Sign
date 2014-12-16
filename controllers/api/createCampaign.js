var router = require("express").Router(),
	ml = require("../db");

var createCampaign = function(req, res) {
	
	var campaign = {}
	campaign.name = req.body.name || "No Name";
	campaign.description = req.body.description || "No description";
	campaign.images = req.body.images;

	saveCampaignToDataBase(campaign, function(){
		res.status(200).end('{"success": "Inserted Campaign into DB"}');
	});
};

var saveCampaignToDataBase = function(data, callback) {
	var nosql = {
		"collection" : "campaigns",
		"document": data
	};
	ml.insertData(nosql, function(err, object) {
		console.log("inserting new campaign");
		if (err) {
			console.warn(err.message);
		} else {
			console.info("Added new campaign:", object[0]._id);
			callback();
		}
	});
};

router.post("/", createCampaign);

module.exports = router;