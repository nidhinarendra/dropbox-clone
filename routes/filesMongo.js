var mongo = require('./mongo');
const keys = require('../config/keys');
var express = require('express');
var router = express.Router();
var multer = require('multer');
var ObjectId = require('mongodb').ObjectID;

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

    console.log(insertFile);
    mongo.connect(keys.mongoURI, function() {
      var coll = mongo.collection('users');

      coll.update(
        { _id: ObjectId(userid) },
        {
          $push: {
            files: { filename: filename, filepath: filepath, star: false }
          }
        }
      );
    });

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
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    var getfiles = coll
      .find({
        _id: ObjectId(userid[1])
      })
      .forEach(function(user) {
        var star = user.files.map(a => a.star);
        var files = user.files.map(a => a.filename);
        var result = [];
        console.log(files.length);
        for (var i = 0; i < files.length; i++) {
          result[i] = { filename: files[i], star: star[i] };
        }
        console.log(result);
        res.send(result);
      });
  });
};

exports.getRecentFiles = function(req, res) {
  console.log(req.params);

  var userid = req.params[0].split('/');
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    var getRecentfiles = coll
      .find({
        _id: ObjectId(userid[1])
      })
      .forEach(function(user) {
        var result = user.files.map(a => a.filename);
        if (result.length < 5) {
          res.send(result);
        } else {
          res.send(result.slice(0, 5));
        }
      });
  });
};

exports.deleteFile = function(req, res) {
  console.log(req.body);

  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    coll.update(
      { _id: ObjectId(req.body.userid) },
      {
        $pull: {
          files: { filename: req.body.item }
        }
      }
    );
  });
};

exports.updateStar = function(req, res) {
  console.log(req.body);

  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    coll.update(
      { _id: ObjectId(req.body.userid), 'files.filename': req.body.file },
      {
        $set: {
          'files.$.star': req.body.star
        }
      }
    );
  });
};
