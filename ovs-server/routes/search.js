var express = require('express');
var router = express.Router();

router.post('/tag', function(req, res){
  var params = ['tag'];

  if(!checkParams(req.body, params)) return res.status(403).send('Missing Params');

  var tag = req.body.tag.split(',');
  var resul = [];


  Tour.find({}, function(err, tours){
    if(err) res.status(409).send("not found");
    if(!tours) res.status(405).send("error");

    for(var i = 0; i < tours.length; i++){
     for(var j = 0; j < tours[i].tag.length; j++){
      for(var k = 0; k < tag.length; k++){
       if(tours[i].tag[j].toString() === tag[k].toString()){
        console.log(tours[i].tag[j].toString() === tag[k].toString());
        resul.push(tours[i]);
       }
       break;
      }
     }
    }

    res.status(200).send(resul);
  });
});

router.post('/user', function(req, res){
  var params = ['user'];

  if(!checkParams(req.body, params)) return res.status(403).send('Missing Params');

  var user = req.body.user;
  var list = [];

  Users.find({}, function(err, users){
    if(err) res.status(409).send("not found");
    if(!users) res.status(405).send("error");

    else{
      for (var i = 0; i < users.length; i++) {
       if(users[i].nick_name.indexOf(user) > -1){
         list.push(users[i]);
       }
      }

      return res.status(200).send(list);
    }
  });

});

function checkParams(body, params) {
  return params.every(str => body[str] != null);
}

module.exports = router;
