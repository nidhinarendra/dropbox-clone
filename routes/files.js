var mysql = require('./mysql');

exports.uploadFile = function(req, res) {
  console.log(req.body);
  res.send('got the file');
};

exports.getFiles = function(req, res) {
  console.log(req.params);
  testJson = {
    statusCode: 200,
    response: 'searching for files'
  };
  res.send(testJson);
};
