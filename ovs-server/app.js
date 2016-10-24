var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ovs');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    id:{type: Number},
    token:{type: String},
    user_id:{type: String, required: true, unique: true},
    nick_name:{type: String},
    pw:{type: String},
    profile_image: {type: String, default: "http://iwin247.net:3000/img/user/default"},

    favorit: [String],
    visit: [{
       name: {type: String},
       name_eng: {type: String},
       img_url: {type: String},
       star: {type: Number, max: 5}
    }]
});

var TourSchema = new mongoose.Schema({
   id: {type: String},
   name: {type: String},
   name_eng: {type: String},
   adress: {type: String},
   gps: {type: String},
   map: {type: String},
   phoneNum: {type: String},
   info: {type: String},
   navigation: {type: String},
   img_url: {type: String},
   restaurant: {type: String},
   tag: [String],
   board_ids: [String],
});

var BoardSchema = new mongoose.Schema({
  id: {type: String},
  board_writer: {type: String},
  writer_img: {type: String},
  date: {type: Date},
  contents: {type: String},
  like: {type: String},
  img_url: {type: String},

  comments:[{
      writer: {type: String},
      date: {type: Date},
      summary: {type: String},
      profile_image: {type: String},
  }]
});

Users = mongoose.model('users', UserSchema);
Boards = mongoose.model('boards', BoardSchema);
Tour = mongoose.model('tourists', TourSchema);

var routes = require('./routes/index');
var users = require('./routes/users');
var board = require('./routes/board');
var auth = require('./routes/auth');
var img = require('./routes/img');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/board', board);
app.use('/auth', auth);
app.use('/img', img);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
