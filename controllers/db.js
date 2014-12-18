var	ml = require("mongolink"),
	uri = 'mongodb://livesign:livesign@ds053190.mongolab.com:53190/heroku_app32455663';
ml.uri = uri;
ml.ObjectID = require("mongodb").ObjectID;

module.exports = ml;