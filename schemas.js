const Joi = require('joi')

const spotSchema = Joi.object({
    spot: Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.spotSchema = spotSchema;



module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        title: Joi.string(),
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})
