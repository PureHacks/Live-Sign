var express = require('express');
var bodyParser = require("body-parser");

var	app = express(),
	port = 8888;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));

// -----------------------------------
// GET & POST /api/image

app.get('/api/images/:id', function (req, res) {
	
	res.send("<h1>" +req.params.id +" </h1>");
});




// -----------------------------------


app.post('/api/test/', function(req, res) {
	console.log("HIT SERVER");
	console.log(req.body, req.body.file);
	console.log("node:",req.body.message);
})



// GET /

app.get('/', function (req, res) {
	res.sendfile('assets/layouts/admin.html');
});




app.listen(port, function() {
    console.log("listening on localhost:" + port);
});