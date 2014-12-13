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
var busboy = require('connect-busboy');

app.use(busboy({ immediate: true }));


app.post("/api/test",function(req, res) {

	console.log("busboy");

	req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		console.log(filename);
		res.status(200).send("<h2>"+filename+"</h2>");

	});

	req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
		
	});

	req.pipe(req.busboy);
 	
});

// GET /

app.get('/', function (req, res) {
	//res.sendfile('assets/layouts/admin.html');
	res.sendfile('test.html');
});




app.listen(port, function() {
    console.log("listening on localhost:" + port);
});