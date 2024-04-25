const Joi = require('joi');
const response = require("../../utils/res")
const otpValidation = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string().required(),
});

const validateOtpAccount = (req, res, next) => {
    const { error } = otpValidation.validate(req.body);
    if (error) {
        return res.status(response.failedStatus).send({status:response.failedStatus,message:error.details[0].message});
    }
    next();
};
module.exports = validateOtpAccount