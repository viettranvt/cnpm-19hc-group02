const Joi = require('@hapi/joi');

const ResetPasswordValidationSchema = Joi.object().keys({
    staffId: Joi.number().required()
});

module.exports = {
  ResetPasswordValidationSchema
};