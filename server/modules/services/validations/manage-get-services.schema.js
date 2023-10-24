const Joi = require('@hapi/joi');
const ServicesConstant = require('../services.constant');

const GetServicesValidationSchema = Joi.object().keys({
  type: Joi.valid([ServicesConstant.TYPES.ORTHER, ServicesConstant.TYPES.RELAX, ServicesConstant.TYPES.ENTERTAIMENT])
});

module.exports = {
  GetServicesValidationSchema
};