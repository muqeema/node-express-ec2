const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();

exports.sendFeed = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        
        const [row] = await conn.execute("SELECT * FROM `userDB`.`users` WHERE `email`=?", [req.body.email]);

        if (row.length === 0) {
            console.log("Test")
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const [rows] = await conn.execute("INSERT INTO `userDB`.`feedTable` (`userId`,`email`,`message`) VALUES(?,?,?)", [
            row[0].id,
            req.body.email,
            req.body.message
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "Data inserted successfully.",
            });
        }
    } catch(err) {
        next(err);
    }
}

exports.feedList = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        
        const [rows] = await conn.execute("SELECT * FROM `userDB`.`feedTable` ");

        if (rows.length > 0) {
            return res.json({feedList: rows});
        }

        res.json({message: "No data found"});
    } catch(err) {
        next(err);
    }
}