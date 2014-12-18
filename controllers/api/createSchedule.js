var router = require("express").Router(),
	ml = require("../db");

var createSchedule = function(req, res) {
	
	var schedule = {}
	schedule.campaignID = req.body.id || 0;
	schedule.start = new Date(req.body.start) || new Date();
	schedule.end = new Date(req.body.end) || new Date(Date.now() + 3600000); //default 1 hr
	console.log("hit POST api/createSchedule", schedule);
	saveScheduleToDataBase(schedule, function(){
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

router.post("/", createSchedule);

module.exports = router;