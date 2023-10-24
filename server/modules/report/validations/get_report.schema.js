const Joi = require('@hapi/joi');

const GetReportValidationSchema = Joi.object().keys({
    bookingId: Joi.number().min(0).allow("").allow(null),
    startDate: Joi.number().min(0).allow("").allow(null),
    endDate: Joi.number().min(0).allow("").allow(null)
  }
);

module.exports = {
  GetReportValidationSchema
};