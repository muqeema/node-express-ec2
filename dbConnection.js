const mysql = require("mysql2");

const db_connection = mysql
  // .createConnection({
  //   host: "127.0.0.1", // HOST NAME
  //   user: "newuser", // USER NAME
  //   database: "userDB", // DATABASE NAME
  //   password: "password1#", // DATABASE PASSWORD
  // })
  .createConnection({
    host: "demords.cgm8zwlxccjv.us-east-1.rds.amazonaws.com", // HOST NAME
    user: "admin", // USER NAME
    database: "demo", // DATABASE NAME
    password: "admin123", // DATABASE PASSWORD
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;