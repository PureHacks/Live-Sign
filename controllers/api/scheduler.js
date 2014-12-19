scheduler = require('node-schedule');

scheduler.init = function() {
	console.log("scheduler.init");
	var ml = require("../db");
	var now = new Date();
	var nosql = {
		"collection": "schedules",
		"selector": {
			"end": {
				"$gt": now.toISOString()
			}
		}
	};

	ml.getData(nosql, function(err, result) {
		if (err) {
			console.log("error! Something is wrong with your query" + err.message);			
		} else {
			scheduler.update(result);
		}
	});
};

scheduler.update = function(futureCampaigns) {
	console.log("scheduler.update:", futureCampaigns);
	var getScheduledCampaigns = require("./getScheduledCampaigns.js");

	for (var i = futureCampaigns.length - 1; i >= 0; i--) {
		var endDate = new Date(futureCampaigns[i].end),
			startDate = new Date(futureCampaigns[i].start);

		scheduler.scheduleJob(endDate, function() {
			console.log("Add schedule:", endDate);
			getScheduledCampaigns.execute();
		});
		scheduler.scheduleJob(startDate, function() {
			console.log("Add schedule:", startDate);
			getScheduledCampaigns.execute();
		});
	};
};

module.exports = scheduler;