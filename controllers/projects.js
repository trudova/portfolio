const Project = require('../models/project');

module.exports.index = async(req, res)=>{
const projects = await Project.find({});
res.render('projects/projects',{projects, pageTitle:'Projects'})
}
module.exports.add =async(req,res)=>{
    const project = new Project(req.body.project);
    project.author = req.user._id;
    console.log(project);
    await project.save();
     req.flash('success', 'Project was posted');
    res.redirect('/projects');

}

module.exports.edit =async(req, res)=>{
    const {id} = req.params;
  await Project.findByIdAndUpdate(id,{...req.body.project});
   req.flash('success', 'Project was updated');
  res.redirect('/projects');
}

module.exports.deleting =async(req, res)=>{
    const {id} = req.params;
   await Project.findByIdAndDelete(id);
    req.flash('success', 'Project was deleted from site');
   res.redirect('/projects');
}

module.exports.editform =async(req, res)=>{
    const {id} = req.params;
    const project = await Project.findById(id);
    res.render('projects/edit',{project, pageTitle:'Edit Project'});
}