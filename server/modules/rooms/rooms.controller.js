"use strict"

const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil')

const Constant = require('./rooms.constant');
const Services = require('./rooms.services');
const PermissionContant = require('../permissions/permissons.constant');

const { GetRoomsValidationSchema } = require('./validations/get-rooms.schema');

const getRooms = async (req, res, next) => {
  logger.info(`${Constant.LOGGER.ROOMS_CONTROLLERS}::getRooms::is called`);
  try {
    const { error } = Joi.validate(req.query, GetRoomsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    if (req.permission.TYPE == PermissionContant.TYPE.RECEPTIONIST) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: Constant.MESSSAGES.PERMISSION_DENIED,
      });
    }

    const { isBooked, roomType } = req.query;
    
    var rooms = await Services.getRooms({ isBooked, roomType });
    return res.status(HttpStatus.OK).json({
      message: "",
      rooms: rooms,
    });
  } catch (exception) {
    logger.error(`${Constant.LOGGER.ROOMS_CONTROLLERS}::getRooms::error`, exception);
    return next(exception);
  }
};

module.exports = {
  getRooms,
};
