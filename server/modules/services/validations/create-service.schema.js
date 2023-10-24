const Joi = require('@hapi/joi');
const ServicesConstant = require('../services.constant');

const CreateServicesValidationSchema = Joi.object().keys({
  type: Joi.valid([ServicesConstant.TYPES.ORTHER, ServicesConstant.TYPES.RELAX, ServicesConstant.TYPES.ENTERTAIMENT]).required(),
  price: Joi.number().min(1).required(),
  name: Joi.string().required(),
  description: Joi.string().required()
});

module.exports = {
  CreateServicesValidationSchema
};