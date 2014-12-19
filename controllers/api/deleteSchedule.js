var router = require("express").Router(),
	ml = require("../db");

var deleteSchedule = function(req, res) {
	var nosql = {
		"collection": "schedules",
		"selector" : {"_id" : ml.ObjectID(req.param("scheduleID"))}
	};
	console.log("Deleting schedule: ", nosql.selector._id);
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

router.delete("/:scheduleID", deleteSchedule);

module.exports = router;