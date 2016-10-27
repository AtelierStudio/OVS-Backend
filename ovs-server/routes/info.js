var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
  var result = [];

  Tour.find({}, function(err, tour){
    for (var i = 0; i < tour.length; i++) {
      result.push({id: tour[i].id, gps: tour[i].gps.split(',')});
    }

    res.status(200).send(result);
  });
});

module.exports = router;
