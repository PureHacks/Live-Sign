var router = require("express").Router(),
	ml = require("../db"),
	cloudinary = require("../cloudinary");

var saveImage = function(req, res) {
	var filePath = req.files.imageFileName.path;
	var fileName = req.body.friendlyName || "Image name undefined";

	cloudinary.upload(filePath, fileName, function(result){
		saveImageUrlToDataBase(result);
		res.redirect('/admin.html'); //where to go next
	});
};

var saveImageUrlToDataBase = function(data) {
	var nosql = {
		"collection": "images",
		"document": data
	};

	ml.insertData(nosql, function(err, object) {
		console.log("inserting new image");
		if (err) {
			console.warn(err.message);
		} else {
			console.info("Added new image", object[0]._id);
		}
	});
};

router.post("/", saveImage);

module.exports = router;