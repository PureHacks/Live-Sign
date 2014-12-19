var router = require("express").Router(),
	ml = require("../db"),
	cloudinary = require("../cloudinary");

var deleteImage = function(req, res) {
	

	var imageID = ml.ObjectID(req.param("imageID")) || 0;
	var cloudinaryId = req.body.id;
	console.log(cloudinaryId, imageID);
	cloudinary.delete(cloudinaryId, function(result){
		deleteImageFromDataBase(imageID, function(result){
			res.status(200).send("success");eeee
		});
	});
};

var deleteImageFromDataBase = function(_id, callback) {
	var nosql = {
		"collection": "images",
		"selector" : {"_id" : _id}
	};

	console.log("Deleting image: ", nosql.selector._id);
	ml.deleteData(nosql, function(err, result) {
		if (err) {
			console.log("error:" + nosql);
			res.send(403, {
				"error": "Something is wrong with your query" + err.message
			});
		} else {
			deleteImageFromCampaigns(_id, callback(result));
		}
	});
};

var deleteImageFromCampaigns = function(_id) {

}

router.delete("/:imageID", deleteImage);

module.exports = router;