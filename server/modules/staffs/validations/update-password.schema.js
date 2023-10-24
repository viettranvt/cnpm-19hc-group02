const Joi = require('@hapi/joi');

const UpdatePasswordValidationSchema = Joi.object().keys({
    oldPassword: Joi.string().required().min(8),
    password: Joi.string().required().min(8),
    confirmedPassword: Joi.string().required().min(8)
  }
);

module.exports = {
  UpdatePasswordValidationSchema
};

