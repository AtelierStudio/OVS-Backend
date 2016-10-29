var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');

var rnd = [];
var aryRnd = [];
var data = [];

for (var i = 1; i < 96; i++) {
    aryRnd.push(i);
}

router.post('/', function(req, res, next) {
    data = [];
    rnd = [];
    var ids = "";
    var best = []
    var cnt = 0;
    var date = moment().tz('Asia/Seoul').format('YYYY MM');

    Tour.find({
        $query: {},
        $orderby: {
            board_ids: -1
        }
    }, function(err, tour) {
        if (err) return res.status(409).send("DB error");
        if (tour) {
            for (var i = 0; i < 4; i++) {
                best.push(tour[i]);
            }

            Recommend.findOne({
                date: date
            }, function(err, rec) {
                if (err) return res.status(409).send("DB error");
                if (rec) {
                  var process = [];
                  Tour.find({}, function(err, tours){
                    for (var i = 0; i < rec.list.length; i++) {
                      for (var j = 0; j < tour.length; j++) {
                        if(rec.list[i] == tours[j].id){
                          process.push(tours[j]);
                          break;
                        }
                      }
                    }

                    return res.status(200).json({
                        best: best,
                        month: process
                    });
                  });
                } else {
                    if (check_Rnd(0)) {
                        Tour.find({}, function(err, tour) {
                            if (tour) {
                                for (var i = 0; i < rnd.length; i++) {
                                    for (var j = 0; j < tour.length; j++) {
                                        if (cnt == 0) {
                                            if (tour[j].id === "mt_" + rnd[i]) {
                                                cnt++;
                                                data.push(tour[j]);
                                                break;
                                            }
                                        } else if (cnt == 1) {
                                            if (tour[j].id === "tr_" + (rnd[i] - 18)) {
                                                cnt++;
                                                data.push(tour[j]);
                                                break;
                                            }
                                        } else if (cnt == 2) {
                                            if (tour[j].id === "lm_" + (rnd[i] - 26)) {
                                                cnt++;
                                                data.push(tour[j]);
                                                break;
                                            }
                                        } else if (cnt == 3) {
                                            if (tour[j].id === "at_" + (rnd[i] - 46)) {
                                                cnt++;
                                                data.push(tour[j]);
                                                break;
                                            }
                                        }
                                    }
                                }

                                for (var i = 0; i < data.length; i++) {
                                    if (i != data.length - 1) ids += data[i].id + ",";
                                    else ids += data[i].id;
                                }


                                var month = new Recommend({
                                    date: date,
                                    list: ids.split(",")
                                });

                                month.save(function(err, data) {
                                    if (err) { // TODO handle the error
                                        return res.status(412).send("Error");
                                    } else {
                                        var process = [];
                                        Tour.find({}, function(err, tours) {
                                            for (var i = 0; i < month.list.length; i++) {
                                                for (var j = 0; j < tour.length; j++) {
                                                    if (month.list[i] == tours[j].id) {
                                                        process.push(tours[j]);
                                                        break;
                                                    }
                                                }
                                            }

                                            return res.status(200).json({
                                                best: best,
                                                month: process
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});

function check_Rnd(n) {
    var idx = 0;

    while (rnd.length < 1 + n) {
        idx = Math.floor(Math.random() * aryRnd.length);
        rnd.push(aryRnd[idx]);
    }


    switch (n) {
        case 0:
            if (rnd[0] - 18 <= 0) {
                return check_Rnd(++n);
                break;
            } else {
                rnd.pop();
                return check_Rnd(0);
                break;
            }

        case 1:
            if (rnd[1] <= 26 && rnd[1] - 18 > 0) {
                return check_Rnd(++n);
                break;
            } else {
                rnd.pop();
                return check_Rnd(1);
                break;
            }

        case 2:
            if (rnd[2] >= 27 && rnd[2] <= 46 && rnd[2] - 26 > 0) {
                return check_Rnd(++n);
                break;
            } else {
                rnd.pop();
                return check_Rnd(2);
                break;
            }

        case 3:
            if (rnd[3] - 46 > 0) {
                return true;
                break;
            } else {
                rnd.pop();
                return check_Rnd(3);
                break;
            }
    }
}


module.exports = router;
