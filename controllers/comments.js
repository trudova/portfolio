const Comment = require('../models/comment');
const Blog = require('../models/blog'); 

module.exports.allcomments = async(req,res)=>{
    const {id} = req.params;
    const post = await Blog.findById(id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    post.comments.push(comment);
    await comment.save();
   await post.save();
    req.flash('success', 'Comment was made');
    res.redirect(`/blog/${post._id}`);
}

module.exports.deletcomment=async(req, res)=>{
    const {id, commentId} = req.params;
   await Blog.findByIdAndUpdate(id, {$pull:{comments: commentId}})
    await Comment.findByIdAndDelete(commentId);
     req.flash('success', 'You deleted your comment');
    res.redirect(`/blog/${id}`);
}