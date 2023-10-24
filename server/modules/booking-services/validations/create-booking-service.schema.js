const Joi = require('@hapi/joi');

const ObjectValidationSchema = Joi.object().keys({
  serviceId : Joi.number().required().min(1),
  number : Joi.number().required().min(1)
});
const CreateBookingServiceValidationSchema = Joi.object().keys({
    bookingId: Joi.number().required(),
    services: Joi.array().items(ObjectValidationSchema).required()
  }
);

module.exports = {
  CreateBookingServiceValidationSchema
};