var express = require('express'),
	bodyParser = require('body-parser');

var	app = express(),
	port = 8888;

app.use(bodyParser.json());

app.use(require('./controllers/static'));

app.listen(port, function(){
	console.log("listening on localhost:" + port);
})