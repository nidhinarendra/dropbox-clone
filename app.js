var express = require('express');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var cors = require('cors');
var path = require('path');
var os = require('os');
var fs = require('fs');
var session = require('client-sessions');
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');
var expressSessions = require('express-session');
var mongoStore = require('connect-mongo')(expressSessions);

require('./routes/passport')(passport);
const keys = require('./config/keys');

var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var userRegister = require('./routes/userRegisterMongo');
var files = require('./routes/files');
var filesMongo = require('./routes/filesMongo');
var foldersMongo = require('./routes/foldersMongo');
var authentication = require('./routes/authentication');

var app = express();
app.use(cookieParser());

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(
  expressSessions({
    secret: keys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
      url: keys.mongoURI
    })
  })
);

app.use(passport.initialize());

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(app.router);

app.use(function() {
  app.use(methodOverride);
  app.use(express.multipart());
});

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//api for mysql
// app.post('/api/users/register', login.register);
// app.post('/api/users/authenticate', login.checkLogin);
// app.get('/api/getFiles*', files.getFiles);
// app.post('/api/uploadFile', files.uploadFile);

//api for mongodb
app.post('/api/users/register', userRegister.register);
app.post('/api/users/authenticate', authentication.authenticate);
app.post('/api/uploadFile', filesMongo.uploadFile);
app.get('/api/getFiles*', filesMongo.getFiles);
app.get('/api/getFolders*', foldersMongo.getFolders);
app.post('/api/uploadFolder', foldersMongo.uploadFolder);
app.get('/api/getRecentFiles*', filesMongo.getRecentFiles);
app.post('/api/deleteFolder', foldersMongo.deleteFolder);
app.post('/api/deleteFile', filesMongo.deleteFile);
app.post('/api/updateStarFile', filesMongo.updateStarFile);
app.get('/api/starredFolders*', foldersMongo.starredFolders);
app.get('/api/starredFiles*', filesMongo.starredFiles);

app.post('/api/users/logout', function(req, res) {
  req.session.destroy();
  res.status(200).send();
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
