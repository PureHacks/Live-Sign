var db = require('../db');

var Schedule = db.model('Schedule', {
	name: 		{ type: String, required: true },
	starttime: 	{ type: Date, required: true },
	endtime: 	{ type: Date, required: true },
});

module.exports = Schedule;