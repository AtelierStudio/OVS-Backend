var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var fs = require('fs');


router.get('/', function(req, res) {

    Tour.find({}, function(err, tour) {
        if (err) return res.status(409)
        if (tour) {
            for (var i = 0; i < tour.length; i++) {
                if (tour[i].img_url.indexOf('https') > -1) {
                    getimgs(tour[i]);
                } else {
                   getimg(tour[i]);
                }
            }

            return res.status(200).send("su");
        }
    });

});

function getimgs(info) {
    var request = https.get(info.img_url, function(res) {

        var imagedata = ''
        res.setEncoding('binary')

        res.on('data', function(chunk) {
            imagedata += chunk
        })

        res.on('end', function() {
            fs.writeFile("upload/place/" + info.id + ".png", imagedata, 'binary', function(err) {
                if (err) throw err
                Tour.update({id: info.id}, {$set: {img_url: "http://iwin247.net:3000/img/place/" + info.id + ".png"}}, function(err, result){
                });
            })
        })
    });
}

function getimg(info) {
    var request = http.get(info.img_url, function(res) {

        var imagedata = ''
        res.setEncoding('binary')

        res.on('data', function(chunk) {
            imagedata += chunk
        })

        res.on('end', function() {
            fs.writeFile("upload/place/" + info.id + ".png", imagedata, 'binary', function(err) {
                if (err) throw err
                Tour.update({id: info.id}, {$set: {img_url: "http://iwin247.net:3000/img/place/" + info.id + ".png"}}, function(err, result){
                });
            })
        })
    });
}

module.exports = router;
