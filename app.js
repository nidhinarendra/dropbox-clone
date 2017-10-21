/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  os = require('os'),
  fs = require('fs'),
  session = require('client-sessions');
var login = require('./routes/login');
var files = require('./routes/files');
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');

var app = express();
app.use(cookieParser());

app.use(cookieSession({ secret: 'app_1' }));
// app.use(
//   session({
//     cookieName: 'session',
//     secret: 'nidhi',
//     duration: 30 * 60 * 1000,
//     activeDuration: 5 * 60 * 1000
//   })
// );
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(app.router);

app.use(function() {
  app.use(methodOverride);
  app.use(express.multipart());
});

app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/api/users/register', login.register);
app.post('/api/users/authenticate', login.checkLogin);
app.get('/api/getFiles*', files.getFiles);
app.post('/api/uploadFile', files.uploadFile);

/* version 1 */

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
