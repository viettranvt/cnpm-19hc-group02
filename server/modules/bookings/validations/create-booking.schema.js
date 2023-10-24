const Joi = require('@hapi/joi');

const CreateBookingValidationSchema = Joi.object().keys({
    userId: Joi.number().required(),
    roomId: Joi.number().required(),
    startDate: Joi.number().required(),
    endDate: Joi.number().required(),
    description: Joi.string().allow("")
  }
);

module.exports = {
  CreateBookingValidationSchema
};