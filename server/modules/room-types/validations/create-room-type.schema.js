const Joi = require('@hapi/joi');
const roomTypesConstant = require('../room-types.contant');

const CreateRoomTypesValidationSchema = Joi.object().keys({
    roomType: Joi.valid([roomTypesConstant.TYPES.ONE_BED, roomTypesConstant.TYPES.THREE_BEDS, roomTypesConstant.TYPES.TWO_BEDS]).required(),
    view: Joi.valid([roomTypesConstant.VIEW.CITY, roomTypesConstant.VIEW.POOL, roomTypesConstant.VIEW.SEA]).required(),
    price: Joi.number().min(1).required()
});

module.exports = {
  CreateRoomTypesValidationSchema
};