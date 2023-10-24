const Joi = require('@hapi/joi');

const CreateUserValidationSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().regex(/((09|03|07|08|05)+([0-9]{8})\b)/).required(),
    identityId: Joi.string().required()
  }
);

module.exports = {
  CreateUserValidationSchema
};

