const Joi = require('@hapi/joi');
const PaymentType = require('../../bills/bills.constant');

const ObjectValidationSchema = Joi.object().keys({
  foodId : Joi.number().required().min(1),
  number : Joi.number().required().min(1)
});
const CreateUserOrderFoodValidationSchema = Joi.object().keys({
    name: Joi.string().allow(""),
    notes: Joi.string().allow(""),
    foods: Joi.array().items(ObjectValidationSchema).required(),
    paymentType: Joi.valid([PaymentType.PAYMENT_TYPE.CASH, PaymentType.PAYMENT_TYPE.DEBIT_CARD, PaymentType.PAYMENT_TYPE.CREDIT_CARD]).required()
  }
);

module.exports = {
  CreateUserOrderFoodValidationSchema
};