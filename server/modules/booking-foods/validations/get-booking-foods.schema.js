const Joi = require('@hapi/joi');

const GetBookingFoodsValidationSchema = Joi.object().keys({
    bookingId: Joi.number().required()
  }
);

module.exports = {
  GetBookingFoodsValidationSchema
};