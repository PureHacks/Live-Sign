var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'mattmcfad', 
  api_key: '339735699794268', 
  api_secret: 'ecRVlmjdaXTG1mX1DcJm7sMp6Pg' 
});

var cloud = {};

cloud.upload = function(image) {
	console.log(image);
	if (image) {
		cloudinary.uploader.upload(image, function(result) { 
			return result; 
		});
	}
	return false;
}

module.exports = cloud;