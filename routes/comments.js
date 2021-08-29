const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Blog = require('../models/blog'); 
const Comment = require('../models/comment');
const comments = require('../controllers/comments')
const {isCoomentAuthore} = require('../middleware');

const {isLoggedIn,validateComment } = require('../middleware');

router.post('/',isLoggedIn, validateComment, catchAsync(comments.allcomments));

router.delete('/:commentId',isLoggedIn, isCoomentAuthore, catchAsync(comments.deletcomment));
module.exports =router;