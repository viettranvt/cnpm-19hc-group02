const Joi = require('@hapi/joi');
const PermissionsConstant = require('../../permissions/permissons.constant');

const CreateStaffValidationSchema = Joi.object().keys({
    permission: Joi.valid([PermissionsConstant.TYPE.RECEPTIONIST, PermissionsConstant.TYPE.RESTAURANT, PermissionsConstant.TYPE.MANAGEMENT]).required(),
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().regex(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/).required(),
    phoneNumber: Joi.string().regex(/((09|03|07|08|05)+([0-9]{8})\b)/).required()
});

module.exports = {
  CreateStaffValidationSchema
};