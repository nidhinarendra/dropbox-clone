var mongo = require('./mongo');
const keys = require('../config/keys');
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
  upload(req, res, function(err) {
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
      }
    }, insertFile);

    if (err) {
      console.log('Upload unsuccessful');
    }
  });
  jsonResponses = {
    statusText: 'File uploaded successfully',
    statusCode: 204
  };
  res.status(204).end();
};
