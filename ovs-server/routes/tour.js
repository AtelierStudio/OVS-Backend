var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var id = req.body.id;
    var board_list = [];

    Tour.findOne({
        id: id
    }, function(err, tour) {
        if (err) res.status(409).send("DB err");
        if (tour) {
            Board.find({}, function(err, board) {
                if (err) return res.status(409).send("DB error");
                if (board) {
                    for (var i = 0; i < tour.board_ids.length; i++) {
                        for (var j = 0; j < board.length; j++) {
                            if (tour.board_ids[i] == board[j].boardid) board_list.push(board[j]);
                        }
                    }

                    if (tour.phoneNum != undefined) {
                        return res.status(200).json({
                            img_url: tour.img_url,
                            name: tour.name,
                            name_eng: tour.name_eng,
                            info: tour.info,
                            tag: tour.tag,
                            adress: tour.adress,
                            phoneNum: tour.phoneNum,
                            boards: board_list
                        });
                    } else {
                        return res.status(200).json({
                            img_url: tour.img_url,
                            name: tour.name,
                            name_eng: tour.name_eng,
                            info: tour.info,
                            tag: tour.tag,
                            adress: tour.adress,
                            phoneNum: null,
                            boards: board_list
                        });
                    }
                }
            });
        } else res.status(401).send("not found");
    });

});

module.exports = router;
