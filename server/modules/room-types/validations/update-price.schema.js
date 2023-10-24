const Joi = require('@hapi/joi');

const UpdatePriceValidationSchema = Joi.object().keys({
    roomTypeId: Joi.number().min(1).required(),
    price: Joi.number().min(1).required()
});

module.exports = {
  UpdatePriceValidationSchema
};