const Joi = require('@hapi/joi');

const UpdateRoomValidationSchema = Joi.object().keys({
    roomId: Joi.number().min(1).required(),
    code: Joi.string(),
    isBooked: Joi.boolean(),
    roomTypeId: Joi.number().min(1)
});

module.exports = {
  UpdateRoomValidationSchema
};