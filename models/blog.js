
const mongoose = require('mongoose');
const Comment = require('./comment');
const User = require('./user');
const Schema = mongoose.Schema;
const BlogSchema  = new Schema({
    articleTitle:String,
    image:String,
    article:String,
    author:{
       type: Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

BlogSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id:{
                $in: doc.comments
            }
        })
    }
});
module.exports = mongoose.model('Post', BlogSchema);