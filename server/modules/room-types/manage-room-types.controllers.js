const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');

const RoomTypesConstant = require('./room-types.contant');
const RoomTypesServices = require('./room-types.services');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');

const { GetRoomTypesValidationSchema } = require('./validations/get-room-types.schema');
const { UpdatePriceValidationSchema } = require('./validations/update-price.schema');
const { CreateRoomTypesValidationSchema } = require('./validations/create-room-type.schema');

const getRoomTypes = async (req, res, next) => {
  logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::is called`);
  try{
    const { error } = Joi.validate(req.query, GetRoomTypesValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { roomType, view } = req.query;
    const roomTypes = await RoomTypesServices.getRoomTypes({code: roomType, view});

    logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::is called`);
    return res.status(HttpStatus.OK).json({
      message: RoomTypesConstant.MESSAGES.GET_ROOM_TYPES.GET_ROOM_TYPES_SUCCESS,
      roomTypes
    });
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::error`, e);
    return next(e);
  }
};

const updatePrice = async (req, res, next) => {
  logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdatePriceValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { roomTypeId, price } = req.body;
    let roomType = await RoomTypesServices.findRoomTypeById(roomTypeId);

    if(!roomType)
    {
      logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::room type not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: RoomTypesConstant.MESSAGES.UPDATE_PRICE.ROOM_TYPE_NOT_FOUND
      });
    }

    const oldPrice = roomType.price;
    roomType.price = price;
    await roomType.save();
    let roomTypeJsonParse = JSON.parse(JSON.stringify(roomType));
    roomTypeJsonParse['oldPrice'] = oldPrice;

    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.ROOM_TYPES.UPDATE_PRICE, description: JSON.stringify(roomTypeJsonParse)});

    logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::is called`);
    return res.status(HttpStatus.OK).json({
      message: RoomTypesConstant.MESSAGES.UPDATE_PRICE.UPDATE_PRICE_SUCCESS,
      roomType: roomTypeJsonParse
    });
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::getRoomTypes::error`, e);
    return next(e);
  }
};

const createRoomType = async (req, res, next) => {
  logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::createRoomType::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateRoomTypesValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { roomType, view, price } = req.body;
    const roomTypeResult = await RoomTypesServices.findRoomTypeByCodeAndView({code: roomType, view});

    if(roomTypeResult)
    {
      logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::createRoomType::room type exists.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: RoomTypesConstant.MESSAGES.CREATE_ROOM_TYPE.ROOM_TYPE_EXISTS
      });
    }

    roomType = await RoomTypesServices.createRoomType({roomType, view, price});
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.ROOM_TYPES.CREATE, description: JSON.stringify(roomType)});

    logger.info(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::createRoomType::is called`);
    return res.status(HttpStatus.OK).json({
      message: RoomTypesConstant.MESSAGES.UPDATE_PRICE.UPDATE_PRICE_SUCCESS,
      roomType
    });
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.MANAGE_ROOM_TYPES_CONTROLLERS}::createRoomType::error`, e);
    return next(e);
  }
};

module.exports = {
  getRoomTypes,
  updatePrice,
  createRoomType
};
