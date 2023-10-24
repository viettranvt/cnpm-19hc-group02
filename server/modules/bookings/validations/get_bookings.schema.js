const Joi = require('@hapi/joi');

const GetBookingsValidationSchema = Joi.object().keys({
    isPayment: Joi.boolean()
  }
);

module.exports = {
  GetBookingsValidationSchema
};