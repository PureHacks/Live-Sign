var express = require('express'),
	bodyParser = require('body-parser');

var	app = express(),
	port = 8888;


app.use(require('./controllers/static'));
app.use(require("./controllers/api/image"))

app.listen(port, function(){
	console.log("listening on localhost:" + port);
})
