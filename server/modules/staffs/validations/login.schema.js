const Joi = require('@hapi/joi');

const LoginValidationSchema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required().min(8)
  }
);

module.exports = {
  LoginValidationSchema
};

