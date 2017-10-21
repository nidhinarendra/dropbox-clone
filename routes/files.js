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

exports.getFiles = function(req, res) {
  console.log(req.params);
  var userid = req.params[0].split('/');
  console.log(userid[1]);
  mysql.getFile(function(err, result) {
    if (err) {
      throw err;
    } else {
      var resultFiles = [];
      for (var i = 0; i < result.length; i += 1) {
        console.log(result[i].filename);
        resultFiles.push(result[i].filename);
      }
      console.log('the result file is');
      console.log(resultFiles);
      res.send('abc');
    }
  }, userid[1]);
};
