const Joi = require('@hapi/joi');

const GetListUsersValidationSchema = Joi.object().keys({
   name: Joi.string()
  }
);

module.exports = {
  GetListUsersValidationSchema
};