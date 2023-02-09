const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const { hashSync } = require('bcrypt');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await conn.execute("SELECT `email` FROM `userDB`.`users` WHERE `email`=?", [req.body.email]);

        if (row.length > 0) {
            return res.status(201).json({message: "The email already in use"});
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute("INSERT INTO `userDB`.`users` (`username`,`email`,`password`,`user_type`) VALUES(?,?,?,?)", [
            req.body.username,
            req.body.email,
            hashPass,
            req.body.user_type
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
    } catch(err) {
        next(err);
    }
}