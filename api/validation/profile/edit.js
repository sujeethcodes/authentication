const Joi = require('joi');
const response = require("../../utils/res")
const editccountValidation = Joi.object({
    userId: Joi.number().required(),
    firstName:  Joi.string().optional(),
    lastName :  Joi.string().optional(),
    phoneNumber :Joi.string().optional(),
    companyName : Joi.string().optional(),
    role : Joi.string().optional(),
});

const validateAccountEdit = (req, res, next) => {
    const { error } = editccountValidation.validate(req.body);
    if (error) {
        return res.status(response.failedStatus).send({status:response.failedStatus,message:error.details[0].message});
    }
    next();
};
module.exports = validateAccountEdit