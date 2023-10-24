const Joi = require('@hapi/joi');
const PermissionsConstant = require('../../permissions/permissons.constant');

const ManageUpdateStaffValidationSchema = Joi.object().keys({
    staffId: Joi.number().required(),
    permission: Joi.valid([PermissionsConstant.TYPE.RECEPTIONIST, PermissionsConstant.TYPE.RESTAURANT, PermissionsConstant.TYPE.MANAGEMENT]),
    fullName: Joi.string(),
    userName: Joi.string(),
    email: Joi.string().regex(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/),
    phoneNumber: Joi.string().regex(/((09|03|07|08|05)+([0-9]{8})\b)/)
});

module.exports = {
  ManageUpdateStaffValidationSchema
};