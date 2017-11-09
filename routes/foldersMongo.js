var mongo = require('./mongo');
const keys = require('../config/keys');
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');

exports.uploadFolder = function(req, res) {
  console.log('entered uploadfolder in mongo');
  console.log(
    'The details received by the server for folder upload is',
    req.body.userid
  );

  var userid = req.body.userid;
  var foldername = req.body.folderName;

  var dir = './uploads/' + foldername;
  console.log('The folder to create is in the path', dir);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  mongo.connect(keys.mongoURI, function() {
    console.log('mongodb connected inside inserrtfolders');
    var coll = mongo.collection('users');
    console.log('userid received is', userid);
    coll.update(
      { _id: ObjectId(userid) },
      {
        $push: {
          folders: { foldername: foldername, folderpath: dir }
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
  console.log(req.params);

  var userid = req.params[0].split('/');
  console.log(userid[1]);
  mongo.connect(keys.mongoURI, function() {
    console.log('mongodb connected inside getfolders');
    var coll = mongo.collection('users');
    console.log('userid received is', userid[1]);
    var getfolders = coll
      .find({
        _id: ObjectId(userid[1])
      })
      .forEach(function(user) {
        console.log(user.folders);
        var result = user.folders.map(a => a.foldername);
        console.log(result);
        res.send(result);
      });
  });
};

exports.deleteFolder = function(req, res) {
  console.log(req.body);

  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    console.log('userid received is', req.body.userid);
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
