const mongoose = require('mongoose');
const keys = require('../config/keys');
var passport = require('passport');
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

mongoose.connect(keys.mongoURI, function(err, result) {
  if (err) {
    console.log('error');
  } else {
    console.log('Successfully connected to db');
  }
});

var UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

var User = mongoose.model('User', UserSchema);

exports.register = function(req, res, next) {
  console.log(req.body.firstname);
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      return next(err);
    }
    json_responses = {
      email: user.emailid,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user.insertId,
      statusCode: 200
    };
    res.json(json_responses);
  });
};

exports.authenticate = function(req, res, next) {
  passport.authenticate('login', function(err, user) {
    if (err) {
      res.status(500).send();
    }
    if (!user) {
      res.status(401).send();
    }
    req.session.user = user.username;
    console.log(req.session.user);
    console.log('session initilized');
    return res.status(201).send({ email: 'test' });
  })(req, res);
};
