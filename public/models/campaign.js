var db = require('../db');

var Campaign = db.model('Campaign', {
	name: 			{ type: String, required: true },
	description: 	{ type: String, required: true },
	date: 			{ type: Date, required: true, default: Date.now },
});

module.exports = Campaign;