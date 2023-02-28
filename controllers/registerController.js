const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { hashSync } = require('bcrypt');
let connectionRequest = require('../connectionRequest')
// const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);


    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors });
    }

    //Establish the connection on this request
    connection = connectionRequest()

    // connection.query("DELETE FROM `userDB`.`users` ", function (err, result, fields) {
    //     if (result.length > 0) {
    //         res.json({feedList: result});
    //     } else {
    //         res.json({message: "No data found"});
    //     }
    // });
    
    connection.query("SELECT `email` FROM `userDB`.`users` WHERE `email`=?", [req.body.email], function (err, result, fields) {
        if (err) {
            return res.status(422).json({ err: err});
            console.log(`not successful! ${err}`);
            connection.destroy();
        } else {
            // console.log(result);
            if (result.length > 0) {
                return res.status(201).json({message: "The email already in use"});
                connection.destroy();
            }
    
            bcrypt.hash(req.body.password, 12).then(function(hashPass) {
                connection.query("INSERT INTO `userDB`.`users` (`username`,`email`,`password`,`user_type`) VALUES(?,?,?,?)", [
                    req.body.username,
                    req.body.email,
                    hashPass,
                    req.body.user_type
                ], function (err, result, fields) {
                    if (err) {
                        console.log(`not successful! ${err}`);
                    }
                    if (result.affectedRows === 1) {
                         return res.status(201).json({
                            message: "The user has been successfully inserted.",
                        });
                    }
                    connection.destroy();
                });
            })
        }
    });
}

// exports.register = async(req,res,next) => {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//     }

//     try {
//         const [row] = await conn.execute("SELECT `email` FROM `userDB`.`users` WHERE `email`=?", [req.body.email]);

//         if (row.length > 0) {
//             return res.status(201).json({message: "The email already in use"});
//         }

//         const hashPass = await bcrypt.hash(req.body.password, 12);

//         const [rows] = await conn.execute("INSERT INTO `userDB`.`users` (`username`,`email`,`password`,`user_type`) VALUES(?,?,?,?)", [
//             req.body.username,
//             req.body.email,
//             hashPass,
//             req.body.user_type
//         ]);

//         if (rows.affectedRows === 1) {
//             return res.status(201).json({
//                 message: "The user has been successfully inserted.",
//             });
//         }
//     } catch(err) {
//         next(err);
//     }
// }