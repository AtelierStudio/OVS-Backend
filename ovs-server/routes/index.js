var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

router.post('/', function(req, res, next) {
  var quize = [];
  var aryQuize = [];
  var idx = 0;
  var data = [];
  var date = moment().tz('Asia/Seoul').format('YYYY MM');
  console.log(date);

  for (var i = 1; i < 96; i++){
      aryQuize.push(i);
  }

  while (quize.length < 4){
    idx = Math.floor(Math.random()*aryQuize.length);
    quize.push(aryQuize[idx]);
    aryQuize.splice(idx,1);
  }


  Tour.find({}, function(err, tour){
   if(err) res.status(409).send("DB err");
   if(tour){
     for(var i = 0; i<quize.length; i++){
       data.push(tour[quize[i]]);
     }
     res.status(200).send(data);
   }else return res.status(412).send("no tour");
   
   
  });

});

module.exports = router;
