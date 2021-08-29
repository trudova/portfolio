const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Email = require('../models/email');
const contacts = require('../controllers/contacts')
const {isLoggedIn,isMe, validateEmail} = require('../middleware');


router.route('/')
.get(contacts.index)
.post(validateEmail, catchAsync(contacts.sendmsg));


router.get('/messages',isLoggedIn, isMe, catchAsync(contacts.getmsgs));

router.delete('/:id',isLoggedIn,isMe, catchAsync(contacts.deletemsg));


module.exports = router;