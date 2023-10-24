const Joi = require('@hapi/joi');
const PaymentType = require('../bills.constant');

const CreateBillsValidationSchema = Joi.object().keys({
   bookingId: Joi.number().required(),
   notes: Joi.string(),
   paymentType: Joi.valid([PaymentType.PAYMENT_TYPE.CASH, PaymentType.PAYMENT_TYPE.CREDIT_CARD, PaymentType.PAYMENT_TYPE.DEBIT_CARD]).required(),
  }
);

module.exports = {
  CreateBillsValidationSchema
};