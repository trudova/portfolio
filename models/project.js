const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: String,
    image:String,
    description: String,
    siteLink: String,
    codeLink: String,
     author:{
       type: Schema.Types.ObjectId,
        ref:'User'
    }
});
module.exports = mongoose.model('Project', ProjectSchema);