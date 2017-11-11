var mongo = require('./mongo');
const keys = require('../config/keys');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');

exports.uploadFolder = function(req, res) {
  var userid = req.body.userid;
  var foldername = req.body.folderName;

  var dir = './uploads/' + foldername;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    coll.update(
      { _id: ObjectId(userid) },
      {
        $push: {
          folders: { foldername: foldername, folderpath: dir, star: false }
        }
      }
    );
  });

  jsonResponses = {
    statusText: 'Folder uploaded successfully',
    statusCode: 204
  };

  res.status(204).end();
};

exports.getFolders = function(req, res) {
  var userid = req.params[0].split('/');
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    var getfolders = coll
      .find({
        _id: ObjectId(userid[1])
      })
      .forEach(function(user) {
        var result = user.folders.map(a => a.foldername);
        res.send(result);
      });
  });
};

exports.starredFolders = function(req, res) {
  var userid = req.params[0].split('/');
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    var getfolders = coll
      .find({
        _id: ObjectId(userid[1])
      })
      .forEach(function(user) {
        var result = user.folders.map(a => a.foldername);
        res.send(result);
      });
  });
};

exports.deleteFolder = function(req, res) {
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    coll.update(
      { _id: ObjectId(req.body.userid) },
      {
        $pull: {
          folders: { foldername: req.body.item }
        }
      }
    );
  });
};
