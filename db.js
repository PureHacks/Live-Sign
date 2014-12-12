var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/livesign', function () {
	console.log('mongodb connected');
});

module.exports = mongoose;