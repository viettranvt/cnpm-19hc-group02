const Joi = require('@hapi/joi');
const ServicesConstant = require('../services.constant');

const UpdateServicesValidationSchema = Joi.object().keys({
  serviceId: Joi.number().min(1).required(),
  type: Joi.valid([ServicesConstant.TYPES.ORTHER, ServicesConstant.TYPES.RELAX, ServicesConstant.TYPES.ENTERTAIMENT]),
  price: Joi.number().min(1),
  name: Joi.string(),
  description: Joi.string()
});

module.exports = {
  UpdateServicesValidationSchema
};