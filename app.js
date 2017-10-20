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

/*
// var upload = multer({ dest: './uploads' })
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './routes/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, 'sdlds');
  }
});
*/

var app = express();

app.use(
  session({
    cookieName: 'session',
    secret: 'nidhi',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
  })
);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.methodOverride());
app.use(app.router);

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.multipart());
});

app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/api/users/register', login.register);
app.post('/api/users/authenticate', login.checkLogin);
// app.post('/api/uploadFile', files.uploadFile);
app.get('/api/getFiles*', files.getFiles);
app.post('/api/upload', files.uploadFinal);

/* version 1 */
app.post(
  '/api/uploadFile',
  multer({ dest: 'uploads/' }).single('myfile'),
  (req, res, next) => {
    console.log('the Object.keys(req.files)  :' + Object.keys(req.files));
    console.log('This is req.files:');
    console.log(req.files.task);
    res.status(204).end();
  }
);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
