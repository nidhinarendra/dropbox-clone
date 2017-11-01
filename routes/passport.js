var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('./mongo');
const keys = require('../config/keys');
var kafka = require('./kafka/client');

module.exports = function(passport) {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true
      },
      function(username, password, done) {
        mongo.connect(keys.mongoURI, function() {
          var coll = mongo.collection('users');
          kafka.make_request(
            'login_topic',
            { username: username, password: password },
            function(err, response) {
              console.log('the response in mongodb is', response);
              coll.findOne({ email: username, password: password }, function(
                err,
                user
              ) {
                if (user) {
                  console.log(user._id.toString());
                  done(null, {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: username,
                    password: password,
                    id: user._id.toString()
                  });
                } else {
                  done(null, false);
                }
              });
            }
          );
        });
      }
    )
  );
};
