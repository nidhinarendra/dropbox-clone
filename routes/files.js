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

exports.uploadFile = function(req, res) {
  upload(req, res, function(req, res, err) {
    if (err) {
      console.log('Upload unsuccessful');
    }
    console.log(req.file.filename);
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
