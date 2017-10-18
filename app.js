/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path'),
  session = require('client-sessions');
var login = require('./routes/login');
var files = require('./routes/files');
var multer = require('multer');
// var upload = multer({ dest: './uploads' })
const storage = multer.diskStorage({
  destination: function(req, res, cb){
    cb(null, './routes/uploads');
  },
  filename: function(req, files, cb) {
    cb(null, files.orignalFilename);
  }
});
var upload = multer({ storage: storage });

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
app.use(express.bodyParser({limit: '50mb'}));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', function(req, res) {
//   res.sendfile('./public/index.html');
// });
//app.get('/users', user.list);
app.post('/api/users/register', login.register);
app.post('/api/users/authenticate', login.checkLogin);
//app.post('/api/uploadFile', files.uploadFile);
app.get('/api/getFiles*', files.getFiles);

app.post('/api/uploadFile', upload.single('avatar'), (req, res, next) => {

  console.log("the storage using is " + storage.getDestination);

  console.log("Te objects in req are " + Object.keys(req) );
console.log("The dumped: " + req._dumped)
  console.log('the request is :' + Object.keys(req.body));
// console.log("body ===")
  console.log(req.files);
  res.status(204).end();
});


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
