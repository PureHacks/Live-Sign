var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
	res.sendfile('layouts/admin.html');
});

// make filepath assets
router.use(express.static(__dirname + "/../assets"));

module.exports = router;