const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');
const user = require('../models/user');

router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.register));

router.route('/login')
.get(users.renderLogin)
.post(
    // use the storeReturnTo middleware to save the returnTo value from sessioj to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    //now we can use res.locals.returnTo to redirect the user after login
    users.login)

router.get('/logout', users.logout)

module.exports = router;