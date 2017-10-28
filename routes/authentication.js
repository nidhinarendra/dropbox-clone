var passport = require('passport');
require('./passport')(passport);

exports.authenticate = function(req, res) {
  passport.authenticate('login', function(err, user) {
    if (err) {
      res.status(500).send();
    } else if (!user) {
      res.status(401).send();
    }
    req.session.user = user.email;
    var user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      statusCode: 200
    };
    console.log('in the server user', user);
    return res.status(201).send(user);
  })(req, res);
};
