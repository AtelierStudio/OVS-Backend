var express = require('express');
var router = express.Router();
var Q = require('q');
var multer = require('multer');

var upload = function(req, res) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function(req, file, cb) {
            cb(null, "upload/user/");
        },

        // 서버에 저장할 파일 명
        filename: function(req, file, cb) {
            if (req.body.token) {
                file.uploadedFile = {
                    name: req.body.token,
                    ext: "png"
                };

                cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
            } else {
                return res.sendStatus(412);
            }
        }
    });

    var upload = multer({
        storage: storage
    }).single('file');
    upload(req, res, function(err) {
        if (err) {
            deferred.reject();
        } else if (req.file === undefined) {
            return res.status(412).send("send error");
        } else {
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};




router.post('/addBoard', function(req, res) {
    upload(req, res).then(function(file) {
        var owner = req.body.token;

        Users.findOne({token: token}, function(err, result) {
            if (err){
              return res.status(406).send("DB error");
            } else if(result){
              
            } else {
              res.status(405).send("no user");
            }
        });
    }, function(err) {
        if (err) return res.status(409).send(err);
    });
});


router.post('/setProfile', function(req, res) {
    upload(req, res).then(function(file) {
        var token = req.body.token;

        Users.update({
            token: token
        }, {
            profile_image: "http://iwin247.net:3000/img/user/" + token
        }, function(err, result) {
            if (err) return res.status(406).send("DB error");
            else {
                Users.findOne({
                    token: token
                }, function(err, user) {
                    if (err) return res.sendStatus(412);
                    if (user) return res.status(200).send(user);
                });
            }
        });
    }, function(err) {
        if (err) return res.status(409).send(err);
    });
});

module.exports = router;
