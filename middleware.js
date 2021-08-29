const {postSchema,commentSchema, projectSchema, emailSchema} = require('./schemas.js')
const ExpressError = require('./utils/ExpressError');
const Blog = require('./models/blog'); 
const Comment = require('./models/comment');
const Project = require('./models/project');

/////////////////////GLOBAL/////////////////////
module.exports.isLoggedIn = (req, res, next) => {

    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


///////////////////BLOG MIDDLE WARE//////////////////////
module.exports.valivateBlog = (req, res, next)=>{
 
const {error}=  postSchema.validate(req.body);
if(error){
    const msg = error.details.map( el => el.message).join(', ');
    throw new ExpressError(msg, 400);
}else{
    next();
}

}

module.exports.isAuthore= async(req, res,next)=>{
const {id} = req.params;
const post = await Blog.findById(id)
if( !post.author.equals(req.user._id)){
req.flash('error', 'You dont have permission for this action')
 return res.redirect(`/blog/${id}`);
}
next();
}

///////////////////END OF BLOG MIDDLE WARE//////////////////////


///////////////////COMMENT MIDDLE WARE//////////////////////

module.exports.validateComment = (req, res, next)=>{
    const {error} = commentSchema.validate(req.body);
     if(error){
        const msg = error.details.map( el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }else{
    next();
    }
}

module.exports.isCoomentAuthore= async(req, res,next)=>{
const {id, commentId} = req.params;
const comment = await Comment.findById(commentId)
console.log("COMMENT AUTOR",comment.author)
//new ObjectId("612a9737946ca537d1fed3b5")
if( !comment.author.equals(req.user._id)){
req.flash('error', 'You dont have permission for this action')
 return res.redirect(`/blog/${id}`);
}
next();
}
///////////////////END OF COMMENT MIDDLE WARE//////////////////////


///////////////////PROJECT MIDDLE WARE//////////////////////
module.exports.validateProject= (req, res, next)=>{
    const {error} = projectSchema.validate(req.body);
    if(error){
        const msg = error.details.map( el => el.message).join(', ');
        throw new ExpressError(msg, 400);
    }else{
    next();
    }
}

module.exports.isProjectAuthore= async(req, res,next)=>{
const {id} = req.params;
const project = await Project.findById(commentId)
if( !project.author.equals(req.user._id)){
req.flash('error', 'You dont have permission for this action')
 return res.redirect(`/projects`);
}
next();
}
///////////////////EMD OF PROJECT MIDDLE WARE//////////////////////
module.exports.validateEmail = (req, res, next)=>{
 const {error} = emailSchema.validate(req.body);
if(error){
    const msg = error.details.map( el => el.message).join(', ');
    throw new ExpressError(msg, 400);
}else{
    next();
}
}

module.exports.isMe = (req, res, next)=>{
    if(!req.user.username){
        req.flash('error', 'You dont have permission for this action');
        return res.redirect('/');
    }
    next();
}
