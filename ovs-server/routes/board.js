var express = require('express');
var router = express.Router();
var rndString = require("randomstring");
var Q = require('q');
var multer = require('multer');
var moment = require('moment');

var upload = function(req, res, boardid) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function(req, file, cb) {
            cb(null, "upload/board");
        },

        // 서버에 저장할 파일 명
        filename: function(req, file, cb) {
            file.uploadedFile = {
                name: boardid,
                ext: "png"
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({
        storage: storage
    }).single('file');

    upload(req, res, function(err) {
        if (err) {
            deferred.reject();
        } else if (req.file === undefined) {
            return res.status(412).send("no file sended");
        } else {
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};




router.post('/write', function(req, res) {
    var boardid = rndString.generate();
    upload(req, res, boardid).then(function(file) {
        var token = req.body.token;
        var contents = req.body.contents;
        var tourid = req.body.tourid;
        var date = moment().format();

        Users.findOne({token: token}, function(err, result) {
            if (err) {
                return res.status(409).send("DB error");
            } else if (result) {

                var board = new Board({
                    boardid: boardid,
                    board_writer: result.nick_name,
                    writer_img: result.profile_image,
                    date: date,
                    contents: contents,
                    img_url: "http://iwin247.net:3000/img/board/" + boardid
                });

                board.save(function(err, data) {
                    if (err) return res.status(409).send("DB error");
                    else{
                      Tour.update({id: tourid}, {$push: {board_ids: boardid}}, function(err, result){
                          if(err) res.status(409).send("DB error");
                          else{
                            Tour.findOne({id: tourid}, function(err, tours){
                              Users.update({token: token}, {$push: {visit: {id: tours.id, name: tours.name, name_eng: tours.name_eng, img_url: tours.img_url}}}, function(err, results){
                                if(err) res.status(409).send("DB error");
                                else res.status(200).send(board);
                              });
                            });
                          }
                      });
                    }
                });
            } else {
                res.status(405).send("no user");
            }
        });
    }, function(err) {
        if (err) return res.status(409).send(err);
    });
});


router.post('/like', function(req, res) {
  var boardid = req.body.boardid;

  Board.findOne({boardid: boardid}, function(err, board){
    if(err) return res.status(409).send("DB error");
    else if(board){
      var like = board.like;
      ++like;
      Board.update({boardid: boardid}, {like: like},function(err, result){
        if(err) return res.status(409).send("DB error");
        else if(result){
          return res.status(200).send(board);
        }else{
          return res.status(405).send("not found");
        }
      });
    }else{
      return res.status(405).send("no board");
    }
  });
});


router.post('/dislike', function(req, res) {
  var boardid = req.body.boardid;

  Board.findOne({boardid: boardid}, function(err, board){
    if(err) return res.status(409).send("DB error");

    else if(board){
      var like = board.like;
      --like;
      Board.update({boardid: boardid},{like: like},function(err, result){
        if(err) return res.status(409).send("DB error");
        else if(result){
          return res.status(200).send(board);
        }else{
          return res.status(405).send("not found");
        }
      });
    }else{
      return res.status(405).send("no board");
    }
  });
});


router.post('/addCommant', function(req, res){
  var token = req.body.token;
  var boardid = req.body.boardid;
  var summary = req.body.summary;
  var date = moment().format();

  Board.findOne({boardid: boardid}, function(err, board) {
    Users.findOne({token: token}, function(err, user) {
      if(err) return res.status(409).send("DB error");
      else if(user){
        Board.update({boardid: boardid}, {$push: {comments:{writer: user.name, date: date, summary: summary, profile_image: user.profile_image}}}, function(err, result){
          if(err) return res.status(409).send("DB error");
          else{
            return res.status(200).send(board);
          }
        });
      }else{
        return res.status(405).send("user not found");
      }
    });
  });
});

module.exports = router;
