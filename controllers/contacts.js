const Email = require('../models/email');

module.exports.index=(req, res)=>{
res.render('other/contacts',{pageTitle:'Contacts'});
}

module.exports.sendmsg=async (req,res)=>{
   const message = new Email(req.body.email);
   await message.save();
    req.flash('success', "Messsage was send, I'll get back to you as soon as posible");
   res.redirect('/contacts')
}

module.exports.getmsgs = async(req, res)=>{
    const messages = await Email.find({});
    res.render('other/messages',{messages, pageTitle:'My Messages'});
}

module.exports.deletemsg=async(req, res)=>{
   const {id} = req.params;
    await Email.findByIdAndDelete(id);
     req.flash('success', 'message was deleted');
    res.redirect('/contacts/messages');
}