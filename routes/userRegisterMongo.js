const mongoose = require('mongoose');
const keys = require('../config/keys');
var passport = require('passport');

mongoose.connect(keys.mongoURI, function(err, result) {
  if (err) {
    console.log('error');
  } else {
    console.log('Successfully connected to db');
  }
});

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

var User = mongoose.model('User', UserSchema);

exports.register = function(req, res, next) {
  console.log(req.body);
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
