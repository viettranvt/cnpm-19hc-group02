const Joi = require('@hapi/joi');

const UpdateConfirmedValidationSchema = Joi.object().keys({
    bookingFoodId: Joi.number().required()
  }
);

module.exports = {
  UpdateConfirmedValidationSchema
};