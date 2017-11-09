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
  password: String,
  files: [
    {
      filename: String,
      filepath: String,
      star: {
        type: Boolean,
        default: false
      },
      sharedWith: [String],
      sharedFrom: [String]
    }
  ],
  folders: [
    {
      foldername: String,
      folderpath: String,
      star: {
        type: Boolean,
        default: false
      },
      sharedWith: [String],
      sharedFrom: [String]
    }
  ]
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
      id: user._id.toString(),
      statusCode: 200
    };
    res.json(json_responses);
  });
};
