const Joi = require('@hapi/joi');
const PermissionsConstant = require('../../permissions/permissons.constant');

const GetStaffsValidationSchema = Joi.object().keys({
    permission: Joi.valid([PermissionsConstant.TYPE.RECEPTIONIST, PermissionsConstant.TYPE.RESTAURANT, PermissionsConstant.TYPE.MANAGEMENT])
});

module.exports = {
  GetStaffsValidationSchema
};