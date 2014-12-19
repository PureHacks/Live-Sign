var router = require("express").Router(),
	ml = require("../db");

var createSchedule = function(req, res) {
	
	var schedule = {}
	schedule.campaignID = req.body.id || 0;
	schedule.start = req.body.start || new Date();
	schedule.end = req.body.end || new Date(Date.now() + 3600000); //default 1 hr
	console.log("hit POST api/createSchedule", schedule);
	saveScheduleToDataBase(schedule, function(){
		getScheduledCampaings();
		res.status(200).end('{"success": "Inserted schedule into DB"}');
	});
};

var saveScheduleToDataBase = function(data, callback) {
	var nosql = {
		"collection" : "schedules",
		"document": data
	};
	ml.insertData(nosql, function(err, object) {
		console.log("inserting new schedule");
		if (err) {
			console.warn(err.message);
		} else {
			console.info("Added new schedule:", object[0]._id);
			callback();			
		}
	});
};


var getScheduledCampaings = function() {	

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
		if (!err) {
			getCampaign(result);
		}
	});
};

var getCampaign = function(campaigns) {
	console.log("getCampaign campaigns = ", campaigns);
	
	var campaignIDs = [];
	var io = require("./activePublish");

	for (var i = campaigns.length - 1; i >= 0; i--) {
		campaignIDs.push({"_id" : ml.ObjectID(campaigns[i].campaignID)});
	};

	var nosql = {
		"collection": "campaigns",
		"selector" : {
			"$or": campaignIDs
		}
	};

	console.log("campaignIDs", campaignIDs);

	ml.getData(nosql, function(err, result) {
		if (!err) {
			console.log("Results", result);
			io.getSocket().emit('publishCampaign', result);		
		}
	});
};

router.post("/", createSchedule);

module.exports = router;