const Joi = require('joi');
const response = require("../../utils/res")
const loginAccountValidation = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string().required(),
});

const validateLoginAccount = (req, res, next) => {
    const { error } = loginAccountValidation.validate(req.body);
    if (error) {
        return res.status(response.failedStatus).send({status:response.failedStatus,message:error.details[0].message});
    }
    next();
};
module.exports = validateLoginAccount