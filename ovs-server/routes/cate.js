var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var params = ['cate']
  var cate = req.body.cate;
  var result = [];

  if(!checkParams(req.body, params)) return res.status(403).send('Missing Params');

  Tour.find({}, function(err, tour){
    for (var i = 0; i < tour.length; i++) {
      if(tour[i].id.indexOf(cate) > -1){
        result.push(tour[i]);
      }
    }

    return res.status(200).send(result);
  });
});

function checkParams(body, params) {
  return params.every(str => body[str] != null);
}

module.exports = router;
