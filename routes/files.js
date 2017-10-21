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

//if bigger size, add a limit
var upload = multer({ storage: storage }).single('myfile');

exports.uploadFile = function(req, res) {
  upload(req, res, function(err) {
    console.log(req.file.originalname);
    console.log(req.body.user);
    var userid = req.body.user;
    var filepath = req.file.path;
    var filename = req.file.originalname;

    var insertFile = {
      userid,
      filepath,
      filename
    };

    mysql.insertFile(function(err, result) {
      if (err) {
        throw err;
      } else {
        // res.send('file uploaded');
      }
    }, insertFile);
    if (err) {
      console.log('Upload unsuccessful');
    } else {
      // res.send('File upload sucessfully.');
    }
  });
  res.send('File upload sucessfully.');
};

exports.getFiles = function(req, res) {
  console.log(req.params);
  testJson = {
    statusCode: 200,
    response: 'searching for files'
  };
  res.send(testJson);
};
