const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {sendFeed} = require('./controllers/feedController');
const {feedList} = require('./controllers/feedController');


// const {login} = require('./controllers/loginController');
// const {getUser} = require('./controllers/getUserController');
// const {getUserList} = require('./controllers/getUserListController');

router.post('/register', [
    body('username','The username must be of minimum 3 characters length')
    .notEmpty()
    .escape()
    .trim()
    .isLength({min: 3}),
    body('email','Invalid email address')
    .notEmpty()
    .escape()
    .trim()
    .isEmail(),
    body('password','The password must be of minimum 4 characters length').notEmpty().trim().isLength({min: 4}),
], register);

router.post('/sendFeed',[
    body('email', 'Invalid email address')
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('message',"Message should not be blank").notEmpty().trim().isLength({ min: 1 }),
], sendFeed);

router.get('/feedList', feedList);

// router.post('/login',[
//     body('email', 'Invalid email address')
//     .notEmpty()
//     .escape()
//     .trim().isEmail(),
//     body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
// ], login);

// router.get('/getUser', getUser);
// router.get('/getUserList', getUserList);

module.exports = router;