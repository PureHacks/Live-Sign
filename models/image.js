var db = require('../db');

var Image = db.model('Image', {
	filename: 	{ type: String, required: true },
	url: 		{ type: String, required: true },
	date: 		{ type: Date, required: true, default: Date.now },
});

module.exports = Image;