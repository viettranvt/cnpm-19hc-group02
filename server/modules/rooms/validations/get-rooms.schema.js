const Joi = require('@hapi/joi');
const RoomsType = require('../../room-types/room-types.contant');

const GetRoomsValidationSchema = Joi.object().keys({
    isBooked: Joi.boolean(),
    roomType: Joi.valid([RoomsType.TYPES.ONE_BED, RoomsType.TYPES.TWO_BEDS, RoomsType.TYPES.THREE_BEDS])
});

module.exports = {
  GetRoomsValidationSchema
};