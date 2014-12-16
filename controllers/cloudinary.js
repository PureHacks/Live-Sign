var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'mattmcfad', 
  api_key: '339735699794268', 
  api_secret: 'ecRVlmjdaXTG1mX1DcJm7sMp6Pg' 
});

var cloud = {};

cloud.upload = function(filepath, filename, callback) {

	if (filepath) {
		cloudinary.uploader.upload(filepath, function(result) {
			if (result.error) {
				console.log(result.error.message);
			} else {
				console.log("cloudinary upload success");
				result.friendlyName = filename;
				callback(result);
			}
		})
	}
	return false;
}

module.exports = cloud;