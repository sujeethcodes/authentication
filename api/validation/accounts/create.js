const Joi = require('joi');
const response = require("../../utils/res")
const createAccountValidation = Joi.object({
    firstName:  Joi.string().required(),
    lastName :  Joi.string().required(),
    phoneNumber :Joi.string().required(),
    companyName : Joi.string().required(),
    role : Joi.string().required(),
    emailId: Joi.string().email().required(),
    password: Joi.string().required(),
});

const validateAccountCreation = (req, res, next) => {
    const { error } = createAccountValidation.validate(req.body);
    if (error) {
        return res.status(response.failedStatus).send({status:response.failedStatus,message:error.details[0].message});
    }
    next();
};
module.exports = validateAccountCreation