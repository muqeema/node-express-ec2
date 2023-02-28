const {validationResult} = require('express-validator');
// const conn = require('../dbConnection').promise();

// exports.sendFeed = async(req,res,next) => {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try {
        
//         const [row] = await conn.execute("SELECT * FROM `userDB`.`users` WHERE `email`=?", [req.body.email]);

//         if (row.length === 0) {
//             console.log("Test")
//             return res.status(422).json({
//                 message: "Invalid email address",
//             });
//         }

//         const [rows] = await conn.execute("INSERT INTO `userDB`.`feedTable` (`userId`,`email`,`message`) VALUES(?,?,?)", [
//             row[0].id,
//             req.body.email,
//             req.body.message
//         ]);

//         if (rows.affectedRows === 1) {
//             return res.status(201).json({
//                 message: "Data inserted successfully.",
//             });
//         }
//     } catch(err) {
//         next(err);
//     }
// }

// exports.feedList = async(req,res,next) => {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try {
        
//         const [rows] = await conn.execute("SELECT * FROM `userDB`.`feedTable` ");

//         if (rows.length > 0) {
//             return res.json({feedList: rows});
//         }

//         res.json({message: "No data found"});
//     } catch(err) {
//         next(err);
//     }
// }


let connectionRequest = require('../connectionRequest')

exports.sendFeed = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    //Establish the connection on this request
    connection = connectionRequest()

        connection.query("SELECT * FROM `userDB`.`users` WHERE `email`=?", [req.body.email],  function (err, result, fields) {
            if (err) {
                // If an error occurred, send a generic server failure
                console.log(`not successful! ${err}`)
                connection.destroy();
    
            } else {
                if (result.length === 0) {
                    console.log("Test")
                    return res.status(422).json({
                        message: "Invalid email address",
                    });
                } else {
                    connection.query("INSERT INTO `userDB`.`feedTable` (`userId`,`email`,`message`) VALUES(?,?,?) ",[
                        result[0].id,
                        req.body.email,
                        req.body.message
                    ],   function (err, result, fields) {
                        if (result.affectedRows === 1) {
                            return res.status(201).json({
                                message: "Data inserted successfully.",
                            });
                        }
                    });
                }
            }
        });
}

exports.feedList = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    //Establish the connection on this request
    connection = connectionRequest()

    // connection.query("DELETE FROM `userDB`.`feedTable` ", function (err, result, fields) {
    //     if (result.length > 0) {
    //         res.json({feedList: result});
    //     } else {
    //         res.json({message: "No data found"});
    //     }
    // });
    //Run the query
    connection.query("SELECT * FROM `userDB`.`feedTable` ", function (err, result, fields) {
        if (err) {
            // If an error occurred, send a generic server failure
            console.log(`not successful! ${err}`)
            connection.destroy();

        } else {

            //send json file to end user if using an API
            // res.json({feedList: result});

            console.log(result);
            if (result.length > 0) {
                res.json({feedList: result});
            } else {
                res.json({message: "No data found"});
            }
    

            //destroy the connection thread
            connection.destroy();
        }
    });
}

