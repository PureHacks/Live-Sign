var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
	res.sendfile('/../../public');
});

// make filepath assets
router.use(express.static(__dirname + "/../assets"));
router.use(express.static(__dirname + "/../layouts"));
router.use(express.static(__dirname + "/../"));

module.exports = router;