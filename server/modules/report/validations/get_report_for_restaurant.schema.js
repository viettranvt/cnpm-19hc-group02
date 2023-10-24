const Joi = require('@hapi/joi');

const GetReportForRestaurantValidationSchema = Joi.object().keys({
    startDate: Joi.number().min(0).allow("").allow(null),
    endDate: Joi.number().min(0).allow("").allow(null)
  }
);

module.exports = {
  GetReportForRestaurantValidationSchema
};