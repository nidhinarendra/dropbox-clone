const mongoose = require('mongoose');
const keys = require('../config/keys');
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
    res.json(user);
  });
};

exports.authenticate = function(req, res, next) {
  console.log(req.body);
  User.find(function(err, user) {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
};
