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
                return res.status(412).send("u send wrong file");
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




router.post('/getInfo', function(req, res) {
    var token = req.body.token;
    var tours = [];

    Users.findOne({
        token: token
    }, function(err, user) {
        if (err) res.sendStatus(405);
        if (user) {
            Tour.find({}, function(err, tour) {
                if (err) return res.status(409).send("DB error");
                if (tour) {
                    for (var i = 0; i < user.favorit.length; i++) {
                        for (var j = 0; j < tour.length; j++) {
                            if (user.favorit[i] === tour[j].id) {
                                tours.push(tour[j])
                                break;
                            }
                        }
                    }

                    return res.status(200).json({
                        nick_name: user.nick_name,
                        profile_image: user.profile_image,
                        favorit: tours,
                        visit: user.visit
                    });
                }
            });
        } else {
            res.status(412).send("no user");
        }
    });
});

router.post('/setProfile', function(req, res) {
    upload(req, res).then(function(file) {
        var token = req.body.token;

        Users.update({token: token}, {profile_image: "http://iwin247.net:3000/img/user/" + token}, function(err, result) {
            if (err) return res.status(406).send("DB error");
            else {
                Users.findOne({token: token}, function(err, user) {
                    if (err) return res.status(412).send("DB ERROR");
                    if (user) return res.status(200).send(user);
                });
            }
        });
    }, function(err) {
        if (err) return res.status(409).send(err);
    });
});

module.exports = router;
