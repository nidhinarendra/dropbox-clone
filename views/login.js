var mongo = require('./mongo');
const keys = require('../config/keys');

function handle_login(msg, callback) {
  var res = {};
  console.log('In handle request:' + JSON.stringify(msg));
  try {
    mongo.connect(keys.mongoURI, function() {
      var coll = mongo.collection('users');
      coll.findOne({ email: msg.username, password: msg.password }, function(
        err,
        user
      ) {
        if (user) {
          res.code = '200';
          res.value = 'Success Login';
          res.data = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
          };
          console.log('in mongodb find', res.data);
        } else {
          res.code = '401';
          res.value = 'Failed Login';
        }
        callback(null, res);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

exports.handle_login = handle_login;
