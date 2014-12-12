
var uri = "mongodb://livesign:livesign@ds053190.mongolab.com:53190/heroku_app32455663";

var ml = require("mongolink");
ml.uri = uri;

module.exports = ml;

