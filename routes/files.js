var mysql = require('./mysql');
var express = require('express');
var router = express.Router();
var multer = require('multer');

exports.uploadFile = function(req, res) {
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
