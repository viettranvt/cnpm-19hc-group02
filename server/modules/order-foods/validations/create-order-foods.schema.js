const Joi = require('@hapi/joi');

const ObjectValidationSchema = Joi.object().keys({
  foodId : Joi.number().required().min(1),
  number : Joi.number().required().min(1)
});
const CreateOrderFoodsValidationSchema = Joi.object().keys({
    bookingId: Joi.number().required(),
    foods: Joi.array().items(ObjectValidationSchema).required()
  }
);

module.exports = {
  CreateOrderFoodsValidationSchema
};

