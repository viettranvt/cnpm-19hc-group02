const Joi = require('@hapi/joi');

const DeleteUserValidationSchema = Joi.object().keys({
    userId: Joi.number().required(),
  }
);

module.exports = {
  DeleteUserValidationSchema
};

