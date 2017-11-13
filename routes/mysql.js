var mysql = require('mysql'); // importing module mysql
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dropbox',
  port: 3306
});

// fetching the data from the sql server
exports.fetchData = function(callback, sqlQuery) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // Use the connection

      connection.query(sqlQuery, function(err, rows, fields) {
        if (err) {
          console.log('ERROR: ' + err.message);
        } else {
          // return err or result
          callback(err, rows);
        }
        connection.release();
      });
    }
  });
  console.log('\nConnection closed..');
};

exports.getFile = function(callback, userid) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // Use the connection
      var fileDetails = connection.query(
        'SELECT fileid, filename FROM files WHERE userid = ?',
        userid,
        function(err, rows, fields) {
          if (err) {
            console.log('ERROR: ' + err.message);
          } else {
            // return err or result
            callback(err, rows);
          }
          connection.release();
        }
      );
    }
  });
  console.log('\nConnection closed..');
};

exports.insertFile = function(callback, sqlQuery) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // Use the connection
      var userdetails = connection.query(
        'INSERT INTO files SET ?',
        sqlQuery,
        function(err, rows, fields) {
          if (err) {
            console.log('ERROR: ' + err.message);
          } else {
            // return err or result
            console.log('DB Results in Mysql: ' + JSON.stringify(rows));
            callback(err, rows);
          }
          connection.release();
        }
      );
    }
  });
  console.log('\nConnection closed..');
};

exports.insertData = function(callback, sqlQuery) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // Use the connection
      var userdetails = connection.query(
        'INSERT INTO users SET ?',
        sqlQuery,
        function(err, rows, fields) {
          if (err) {
            console.log('ERROR: ' + err.message);
          } else {
            // return err or result
            callback(err, rows);
          }
          connection.release();
        }
      );
    }
  });

  console.log('\nConnection closed..');
};

exports.updateData = function(callback, sqlQuery) {
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('ERROR: ' + err.message);
    } else {
      // Use the connection

      connection.query(sqlQuery, function(err, rows, fields) {
        if (err) {
          console.log('ERROR: ' + err.message);
        } else {
          // return err or result
          callback(err, rows);
        }
        connection.release();
      });
    }
  });

  console.log('\nConnection closed..');
};
