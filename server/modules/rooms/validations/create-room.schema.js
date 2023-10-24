const Joi = require('@hapi/joi');

const CreateRoomValidationSchema = Joi.object().keys({
    code: Joi.string().required(),
    roomTypeId: Joi.number().min(1).required()
});

module.exports = {
  CreateRoomValidationSchema
};