var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

router.get('/', function(req, res, next) {
  res.send("즐거운 코딩 룰루랄라");
});

module.exports = router;
