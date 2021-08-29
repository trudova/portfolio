const Blog = require('../models/blog'); 

module.exports.index = async(req, res)=>{
const blog = await Blog.find({});
 res.render('blog/posts',{blog, pageTitle:'Blog'});
}
module.exports.addPost = async(req, res)=>{
 const post = new Blog(req.body.post);
 post.author = req.user._id;
  await post.save();
  req.flash('success', 'Post was made');
  res.redirect(`/blog/${post._id}`);
}
module.exports.new = (req, res)=>{
    res.render('blog/newpost',{pageTitle:'New Post'});
}

module.exports.singlePost =async(req,res)=>{
    const {id} = req.params;
    const post =  await Blog.findById(id)
    .populate({path:'comments',
               populate:{
                path:'author'
                }
             }).populate('author');

    if(!post){
        req.flash('error','Post was not found');
        return res.redirect('/blog');
    }
    res.render('blog/show',{post, pageTitle:'Post'});
}

module.exports.edit =async(req, res)=>{
 const {id} = req.params;

 await Blog.findByIdAndUpdate(id, {...req.body.post});
  req.flash('success', 'Post was updated');
 res.redirect(`/blog/${id}`);
}
module.exports.deleting =async(req, res)=>{
    const {id} = req.params;
   await Blog.findByIdAndDelete(id);
    req.flash('success', 'Post was deleted');
   res.redirect('/blog')
}
module.exports.editform  =async (req, res)=>{
    const {id} = req.params;
     const post = await Blog.findById(id);
       if(!post){
        req.flash('error','Post was not found');
        return res.redirect('/blog');
    }
     res.render('blog/edit',{post, pageTitle:'Edit Post'})

}