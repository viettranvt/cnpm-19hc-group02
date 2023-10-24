const Joi = require('@hapi/joi');

const GetSchedulesValidationSchema = Joi.object().keys({
    staffId: Joi.number().min(1)
});

module.exports = {
  GetSchedulesValidationSchema
};