const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Project = require('../models/project');
const projects = require('../controllers/projects');
const {isLoggedIn, validateProject,isProjectAuthore} = require('../middleware');

router.route('/')
.get( catchAsync(projects.index))
.post(isLoggedIn, validateProject, catchAsync(projects.add));

router.get('/new',isLoggedIn, (req, res)=>{
    res.render('projects/newproject', {pageTitle:'Add Project'});
});

router.route('/:id')
.put(isLoggedIn, isProjectAuthore, validateProject, catchAsync(projects.edit))
.delete(isLoggedIn,isProjectAuthore, catchAsync(projects.deleting));

router.get('/:id/edit',isProjectAuthore, catchAsync(projects.editform));
// /////////////// END OF PROJECTS///////////////////////

module.exports= router;