var express = require('express');
var router = express.Router();

router.get('/user/:img', function(req, res, next) {
  res.sendFile("/home/june/server/OVS-backend/ovs-server/upload/board/"+req.params.img+".png")
});

router.get('/board/:img', function(req, res, next) {
  res.sendFile("/home/june/server/OVS-backend/ovs-server/upload/board/"+req.params.img+".png")
});

module.exports = router;
