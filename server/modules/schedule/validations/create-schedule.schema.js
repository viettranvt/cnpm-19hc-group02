const Joi = require('@hapi/joi');

const CreateScheduleValidationSchema = Joi.object().keys({
    staffId: Joi.number().required(),
    startDate: Joi.number().required(),
    endDate: Joi.number().required(),
    notes: Joi.string()
});

module.exports = {
    CreateScheduleValidationSchema
};