const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const Blog = require('../models/blog'); 
const blog = require('../controllers/blog')
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn, valivateBlog, isAuthore} = require('../middleware');

router.route('/')
.get(catchAsync(blog.index))

.post(isLoggedIn, valivateBlog, catchAsync(blog.addPost));

router.get('/new', isLoggedIn, blog.new);

router.route('/:id')
.get( catchAsync(blog.singlePost))
.put(isLoggedIn, isAuthore, valivateBlog, catchAsync(blog.edit))
.delete(isLoggedIn, isAuthore, catchAsync(blog.deleting));

router.get('/:id/edit',isLoggedIn, isAuthore, catchAsync(blog.editform));

////////////// END OF BLOG///////////////////////
module.exports =router;