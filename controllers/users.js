const User = require('../models/user'); 

module.exports.signup=async(req,res, next)=>{
 try{ const {email, username, password} = req.body;
  const user  = new User({email, username});
  const registerdUser = await User.register(user, password);
req.login(registerdUser,err=>{
    if(err) return next(err);

    req.flash('success','Welcom to my personal web site, now you able to comment my blog ');
    res.redirect('/');
})
  
}catch(err){
    req.flash('error', err.message);
    res.redirect('/register');
}
}
module.exports.loginform =(req, res)=>{
    res.render('users/login',{pageTitle: 'Login'});

}
module.exports.signin=(req, res)=>{
    req.flash('success', 'Welcome back!!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.signout=(req,res)=>{
    req.logout();
    req.flash('success', 'Goodbye');
    res.redirect('/');
}