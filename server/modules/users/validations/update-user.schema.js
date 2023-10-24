const Joi = require('@hapi/joi');

const UpdateUserValidationSchema = Joi.object().keys({
    userId: Joi.number().required(),
    fullName: Joi.string(),
    address: Joi.string(),
    phoneNumber: Joi.string().regex(/((09|03|07|08|05)+([0-9]{8})\b)/)
  }
);

module.exports = {
  UpdateUserValidationSchema
};