var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var fs = require('fs');
var User = require('./models/user.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//test
app.get('/form', function(req, res) {
fs.readFile('./form.html', function(error, content) {
if (error) {
 res.writeHead(500);
 res.end();
 }
 else {
 res.writeHead(200, { 'Content-Type': 'text/html' });
 res.end(content, 'utf-8');
 }
 });
});
app.get('/signup', function(req, res) {
fs.readFile('./signup.html', function(error, content) {
if (error) {
 res.writeHead(500);
 res.end();
 }
 else {
 res.writeHead(200, { 'Content-Type': 'text/html' });
 res.end(content, 'utf-8');
 }
 });
});
app.get('/users/:uid', function(req, res){
  var pas = User.findUser(req.params.uid, function(err){
    if(err) throw err;
  });
});
app.post('/signup', function(req, res) {
  var newuser = new User.newUser();
 newuser.username = req.body.username;
 newuser.password = req.body.password;
 User.addUser(newuser, function(err, user) {
  if (err) throw err;
 res.redirect('/form');
 });
});
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

