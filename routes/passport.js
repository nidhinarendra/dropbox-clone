var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('./mongo');
const keys = require('../config/keys');

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
        try {
          mongo.connect(keys.mongoURI, function() {
            var coll = mongo.collection('users');
            var findUser = coll.findOne(
              { email: username, password: password },
              function(err, user) {
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
              }
            );
          });
        } catch (e) {
          done(e, {});
        }
      }
    )
  );
};
