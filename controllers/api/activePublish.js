
var io = {};
var socket = {};

io.init = function(server) {
	socket = require('socket.io').listen(server); // this tells socket.io to use our express server	
};

io.getSocket = function() {
	return socket;
}

module.exports = io;