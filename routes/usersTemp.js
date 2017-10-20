/*
 * GET users listing.
 */
var mysql = require('./mysql');
var CryptoJS = require('crypto-js');
var express = require('express');
var router = express();
var multer = require('multer');
var glob = require('glob');

router.post('/authenticate', function(req, res, next) {
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
        var bytes = CryptoJS.AES.decrypt(pwd.toString(), 'nidhi');
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if (plaintext === password) {
          req.session.email = results[0].emailid;
          req.session.name = results[0].firstname;
          req.session.lastname = results[0].lastname;
          req.session.id = results[0].userid;
          json_responses = {
            statusCode: 200,
            id: results[0].userid,
            email: results[0].emailid,
            fn: results[0].firstname,
            ln: results[0].lastname
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
});

router.post('/register', function(req, res, next) {
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
    if (err) {
      throw err;
    } else {
      req.session.email = insertUser.emailid;
      req.session.name = insertUser.firstname;
      req.session.lastname = insertUser.lastname;
      req.session.id = results.insertId;
      json_responses = {
        email: insertUser.emailid,
        firstname: insertUser.firstname,
        lastname: insertUser.lastname,
        id: results.insertId,
        statusCode: 200
      };
      res.send(json_responses);
    }
  }, insertUser);
});

module.exports = router;
