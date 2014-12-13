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

		var fs = require("fs");

        //Path where image will be uploaded
		fstream = fs.createWriteStream(__dirname + '/tmp/' + filename);
		file.pipe(fstream);
		
		fstream.on('close', function () {    
			console.log("Upload Finished of " + filename);

			var cloudinary = require('cloudinary');

			cloudinary.config({ 
				cloud_name: 'mattmcfad', 
				api_key: '339735699794268', 
				api_secret: 'ecRVlmjdaXTG1mX1DcJm7sMp6Pg' 
			});

			var filepath = __dirname + "/tmp/" + filename;

			cloudinary.uploader.upload(filepath, function(result) {
				console.log(result);
				res.redirect('back');           //where to go next
			})
		});


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