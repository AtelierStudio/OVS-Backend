var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var id = req.body.id;

  Tour.findOne({id: id}, function(err, tour){
    if(err) res.status(409).send("DB err");
    if(tour) res.status(200).send(tour);
    else res.status(401).send("not found");
  });

});

module.exports = router;
