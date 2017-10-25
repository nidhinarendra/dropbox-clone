var passport = require('passport');
require('./passport')(passport);

exports.authenticate = function(req, res) {
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
    return res.status(201).send({ username: 'test' });
  })(req, res);
};
