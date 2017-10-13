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
  // These two variables come from the form on
  // the views/login.hbs page
  var emailid = req.param(' emailid');
  var password = req.param('password');
  var json_responses;
  var getUser = "select * from members where  emailid='" + emailid + "'";
  log.info(getUser);
  mysql.fetchData(function(err, results) {
    console.log('DB Results:' + results);
    if (err) {
      throw err;
    } else {
      if (results.length > 0) {
        var pwd = results[0].password;
        var bytes = CryptoJS.AES.decrypt(pwd.toString(), 'pooja');
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log(password);
        console.log(plaintext);
        if (plaintext == password) {
          req.session.emailid = results[0].emailid;
          req.session.name = results[0].firstname;
          req.session.lastname = results[0].lastname;
          req.session.id = results[0].user_id;
          req.session.birthday = results[0].birthday;
          var lastlogdt = results[0].lastlogin;
          if (lastlogdt != null) {
            req.session.lastlogin = lastlogdt.substring(0, 25);
          } else {
            req.session.lastlogin = '';
          }
          log.info('Login successfulfor the user, ' + results[0].user_id);
          json_responses = {
            statusCode: 200
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
  console.log('darshan hjere!!!!!!!!!!!!!!!!!!!!!!!\n\n\n\n');
  console.log(req.body);
  console.log(req.body.firstName);
  // var jsontext = {
  //   statuscode: 200
  // };
  // res.send(jsontext);
  var firstname = req.body.firstName;
  console.log('The first name given by user ' + firstname);
  var lastname = req.body.lastName;
  var emailid = req.body.email;
  var rawpassword = req.body.password;

  var json_responses;
  var dt = new Date();
  var password = CryptoJS.AES.encrypt(password, 'nidhi');

  var insertUser = {
    firstname,
    lastname,
    emailid,
    password
  };

  console.log('before mysql: ' + insertUser);
  // console.log(
  //   '!!!!!!' +
  //     typeof req.body +
  //     '     dmfnlakhva    ' +
  //     typeof req.body.firstName +
  //     '  .hbskdugfh0     ' +
  //     typeof firstName +
  //     '     jhdgfua ' +
  //     firstname
  // );

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
      console.log('req: ' + req.session);
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
