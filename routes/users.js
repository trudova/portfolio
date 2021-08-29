const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user'); 
const users = require('../controllers/users');
const ExpressError = require('../utils/ExpressError');
const passport = require('passport');
router.get('/register', (req,res)=>{
res.render('users/register',{pageTitle:'Register'})
});

router.post('/register',catchAsync(users.signup));
router.route('/login')
.get(users.loginform)
.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.signin);

router.get('/logout',users.signout)
module.exports = router;