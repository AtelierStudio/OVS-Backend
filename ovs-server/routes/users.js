var express = require('express');
var router = express.Router();
var Q = require('q');
var multer = require('multer');

var upload = function (req, res) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, "upload/user/");
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            file.uploadedFile = {
                name: req.body.token,
                ext: file.mimetype.split('/')[1]
            };

            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            deferred.reject();
        }else if(req.file === undefined){
            return res.status(412).send("send error");
        }else{
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};




router.post('/getInfo', function(req, res) {
    var token = req.body.token;
    Users.find({token: token}, function(err, user){
        if(err) res.sendStatus(405);
        if(user){
             res.status(200).send(user);
        }else{
             res.status(412).send("no user");
        }        
    });
});

router.post('/setProfile', function(req, res){
      upload(req, res).then(function (file) {
        var token = req.body.token;
        Users.update({token: token}, {profile_image: "http://iwin247.net/img/user/"+token},function(err, result) {
           console.log(result)
           if (err) return res.status(406).send("DB error");
           else return res.status(200).send("success");
        });
      }, function (err) {
          if(err) return res.status(409).send(err);
      });
});

module.exports = router;
