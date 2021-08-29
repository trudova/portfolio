   const Joi = require('joi');
   module.exports.postSchema = Joi.object({
    post:Joi.object({
        articleTitle: Joi.string().required(),
        article: Joi.string().required(),
        image: Joi.string().required()
    }).required()
});

module.exports.emailSchema = Joi.object({
    email: Joi.object({
        name : Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        message: Joi.string().required()
    }).required()
})
module.exports.projectSchema = Joi.object({
    project: Joi.object({
    projectName: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    siteLink: Joi.string().required(),
    codeLink: Joi.string().required()
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
    body: Joi.string().required(),
    }).required()
});