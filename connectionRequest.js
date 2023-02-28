module.exports = function () {

    let mysql = require('mysql2')

    // set NODE_ENV=production
    // set NODE_ENV=default
    const config = require('config');

    //Establish Connection to the DB
    let connection = mysql.createConnection({
        host: config.get('app.host'), // HOST NAME
        user: config.get('app.user'), // USER NAME
        database: config.get('app.database'), // DATABASE NAME
        password: config.get('app.password'), // DATABASE PASSWORD
      });

    //Instantiate the connection
    connection.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed ${err.stack}`)
        } else {
            console.log(`DB connectionRequest Successful ${connection.threadId}`)
        }
    });

    //return connection object
    return connection
}