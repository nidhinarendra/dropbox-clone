var mysql = require('./mysql');
var CryptoJS = require('crypto-js');
var SimpleNodeLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'mylogfile.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
  },
  log = SimpleNodeLogger.createSimpleLogger(opts);
var log = SimpleNodeLogger.createSimpleFileLogger('project.log');

exports.checkLogin = function(req, res) {
  var emailid = req.body.email;
  var password = req.body.password;
  var json_responses;
  var getUser = "select * from users where  emailid='" + emailid + "'";

  log.info(getUser);

  mysql.fetchData(function(err, results) {
    console.log('DB Results:' + results);
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        var pwd = results[0].password;
        console.log('pwd: ' + pwd);
        var bytes = CryptoJS.AES.decrypt(pwd.toString(), 'nidhi');
        console.log('bytes: ' + bytes);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log('password is: ' + password);
        console.log('The plain text: ' + plaintext);
        if (plaintext === password) {
          req.session.email = results[0].emailid;
          req.session.name = results[0].firstname;
          req.session.lastname = results[0].lastname;
          req.session.id = results[0].user_id;

          console.log('Login successful for the user, ' + results[0].userid);
          json_responses = {
            statusCode: 200,
            user: results[0].userid,
            email: results[0].emailid,
            fn: results[0].firstname
          };
          res.send(json_responses);
        } else {
          json_responses = {
            statusCode: 401
          };
          res.send(json_responses);
        }
      } else {
        json_responses = {
          statusCode: 401
        };
        res.send(json_responses);
      }
    }
  }, getUser);
};

exports.register = function(req, res) {
  var firstname = req.body.firstName;
  var lastname = req.body.lastName;
  var emailid = req.body.email;
  var rawpassword = req.body.password;

  var json_responses;
  var dt = new Date();
  var password = CryptoJS.AES.encrypt(rawpassword, 'nidhi');

  var insertUser = {
    firstname,
    lastname,
    emailid,
    password
  };

  mysql.insertData(function(err, results) {
    console.log('DB Results in users:' + JSON.stringify(results));
    //console.log('req: ' + req.session);
    if (err) {
      throw err;
    } else {
      req.session.email = insertUser.emailid;
      req.session.name = insertUser.firstname;
      req.session.lastname = insertUser.lastname;
      req.session.id = results.insertId;
      json_responses = {
        statusCode: 200
      };
      res.send(json_responses);
    }
  }, insertUser);
};

exports.redirectToHomepage = function(req, res) {
  // Checks before redirecting whether the session is valid
  if (req.session.emailid && req.session.name) {
    // Set these headers to notify the browser not to maintain any cache for
    // the page being loaded
    log.info('The user ' + req.session.id + 'accessing /homepage');
    res.header(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    );
    res.render('homepage', {
      name: req.session.name,
      lastlogin: req.session.lastlogin
    });
  } else {
    log.info('Session expired for the user ' + req.session.id);
    res.redirect('/');
    // res.render('login', { title: 'Login' });
  }
};

exports.userprofile = function(req, res) {
  // Checks before redirecting whether the session is valid
  if (req.session.emailid && req.session.name) {
    log.info('The user ' + req.session.id + 'accessing /userprofile');
    res.render('profilepage', {
      emailid: req.session.emailid,
      birthday: req.session.birthday,
      name: req.session.name,
      lastname: req.session.lastname,
      lastlogin: req.session.lastlogin
    });
  } else {
    res.redirect('/');
  }
};

exports.logout = function(req, res) {
  log.info('The user ' + req.session.id + 'logging out');
  var dt = new Date();
  updateUser =
    "update members set lastlogin= '" +
    dt.toString() +
    "' where user_id=" +
    req.session.id;
  mysql.updateData(function(err, results) {
    console.log('DB Results:' + results);
    if (err) {
      throw err;
    }
  }, updateUser);
  req.session.destroy();
  res.redirect('/');
};
