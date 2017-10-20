var mysql = require('./mysql');
var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('myfile');

exports.uploadFinal = function(req, res) {
  upload(req, res, function(err) {
    if (err) {
    }
  });
  res.send('File upload sucessfully.');
};

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './routes/uploads');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldName + '-' + Date.now());
//   }
// });
//
// //var upload = multer({ storage: storage });
// var upload = multer({ storage });

exports.uploadFile = function(req, res) {
  multer({ dest: 'public/uploads/' }).single('myfile');
  // upload.single('myfile');
  console.log(req.files.myfile.path);
  console.log(req.body);
  res.send('got the file');
};

exports.getFiles = function(req, res) {
  console.log(req.params);
  testJson = {
    statusCode: 200,
    response: 'searching for files'
  };
  res.send(testJson);
};
