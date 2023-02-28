const mysql = require("mysql2");

const config = require('config');

const db_connection = mysql.createConnection({
    host: config.get('app.host'), // HOST NAME
    user: config.get('app.user'), // USER NAME
    database: config.get('app.database'), // DATABASE NAME
    password: config.get('app.password'), // DATABASE PASSWORD
  });


  db_connection.connect(function (err) {
    if (err) {
        console.log(`connectionRequest Failed ${err.stack}`)
        db_connection.destroy();
    } else {
        console.log(`DB connectionRequest Successful ${db_connection.threadId}`)
    }
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;