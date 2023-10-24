const Joi = require('@hapi/joi');

const GetBillInfoValidationSchema = Joi.object().keys({
   bookingId: Joi.number().required()
  }
);

module.exports = {
  GetBillInfoValidationSchema
};