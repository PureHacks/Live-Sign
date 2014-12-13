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
		
		console.log(fieldname, filename, encoding, mimetype);
		console.log("Uploading: " + filename); 

		var fs = require("fs")

       	var fstream = fs.createWriteStream('/temp/' + filename);

        file.pipe(fstream);

        fstream.on('close', function () {

        	console.log("done");
			res.redirect('back');

        });

		// var cloudinary = require('cloudinary');

		// cloudinary.config({ 
		// 	cloud_name: 'mattmcfad', 
		// 	api_key: '339735699794268', 
		// 	api_secret: 'ecRVlmjdaXTG1mX1DcJm7sMp6Pg' 
		// });

		// var cloud = {};

		// cloud.upload = function(image) {
		// 	console.log(image);
		// 	if (image) {
		// 		cloudinary.uploader.upload(image, function(result) { 
		// 			return result; 
		// 		});
		// 	}
		// 	return false;
		// }

		// var result = cloud.upload(file)
		// console.log(result);

		// res.status(200).send("<h2>"+filename+"</h2>");
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