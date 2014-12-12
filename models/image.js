var db = require('../db');

var Img = db.model('Image', {
	filename: 	{ type: String, required: true },
	cloudkey: 	{ type: String, required: true },
	date: 		{ type: Date, required: true, default: Date.now },
});

module.exports = Img;