var getScheduledCampaigns = {};
var ml = require("../db");

getScheduledCampaigns.execute = function() {
	console.log("\n\ngetScheduledCampaigns.execute\n\n");

	var now = new Date();

	var nosql = {
		"collection": "schedules",
		"selector": {
			"$and": [{
				"start": {
					"$lte": now.toISOString()
				}
			}, {
				"end": {
					"$gte": now.toISOString()
				}
			}]
		}
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
			console.log("getScheduledCampaigns.execute Error:", err.message);
		} else {
			getScheduledCampaigns.getCampaign(result);
		}
	});
};

getScheduledCampaigns.getCampaign = function(campaigns) {
	var io = require("./activePublish");
	var campaignIDs = [];

	for (var i = campaigns.length - 1; i >= 0; i--) {
		campaignIDs.push({
			"_id": ml.ObjectID(campaigns[i].campaignID)
		});
	};

	var nosql = {
		"collection": "campaigns",
		"selector": {
			"$or": campaignIDs
		}
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
		 	console.log("getScheduledCampaigns.getCampaign Error:", err.message);			
		 } else {
			console.log("Emit publishCampaign", result);
			io.getSocket().emit('publishCampaign', result);
		}
	});
};

module.exports = getScheduledCampaigns;