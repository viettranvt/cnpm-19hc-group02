const Joi = require('@hapi/joi');

const UpdateScheduleValidationSchema = Joi.object().keys({
    scheduleId: Joi.number().required(),
    startDate: Joi.number(),
    endDate: Joi.number(),
    notes: Joi.string()
});

module.exports = {
  UpdateScheduleValidationSchema
};