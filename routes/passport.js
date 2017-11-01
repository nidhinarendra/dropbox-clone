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
        kafka.make_request(
          'login1_topic',
          { username: username, password: password },
          function(err, response) {
            console.log('the response in kafka make request is', response);
            if (err) {
              done(err, {});
            } else {
              if (response.code == 200) {
                done(null, {
                  id: response.data.id,
                  email: username,
                  password: password,
                  firstName: response.data.firstName,
                  lastName: response.data.lastName
                });
              } else {
                done(null, false);
              }
            }
          }
        );
      }
    )
  );
};
