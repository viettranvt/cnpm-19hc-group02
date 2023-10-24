const Joi = require('@hapi/joi');
const RoomsType = require('../../room-types/room-types.contant');

const ManageGetRoomsValidationSchema = Joi.object().keys({
    isBooked: Joi.boolean(),
    roomType: Joi.valid([RoomsType.TYPES.ONE_BED, RoomsType.TYPES.TWO_BEDS, RoomsType.TYPES.THREE_BEDS]),
    view: Joi.valid([RoomsType.VIEW.CITY, RoomsType.VIEW.POOL, RoomsType.VIEW.SEA])
});

module.exports = {
  ManageGetRoomsValidationSchema
};