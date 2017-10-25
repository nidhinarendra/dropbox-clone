var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('./mongo');
const keys = require('../config/keys');

module.exports = function(passport) {
  console.log('now in passport.js');
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: true
      },
      function(username, password, done) {
        console.log('inside localstrategy');
        console.log(username, password);
        try {
          mongo.connect(keys.mongoURI, function() {
            console.log('connected to the db in passportjs');
            var coll = mongo.collection('users');

            coll.findOne({ email: username, password: password }, function(
              err,
              user
            ) {
              if (user) {
                done(null, { email: username, password: password });
              } else {
                done(null, false);
              }
            });
          });
        } catch (e) {
          done(e, {});
        }
      }
    )
  );
};
