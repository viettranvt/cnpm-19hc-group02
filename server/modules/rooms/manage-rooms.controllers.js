const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil')

const RoomsConstant = require('./rooms.constant');
const RoomsServices = require('./rooms.services');
const RoomTypesServices = require('../room-types/room-types.services');
const ModelsConstant = require('../../models/models.constant');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { ManageGetRoomsValidationSchema } = require('./validations/manage-get-rooms.schema');
const { CreateRoomValidationSchema } = require('./validations/create-room.schema');
const { UpdateRoomValidationSchema } = require('./validations/update-room.schema');

const getRooms = async (req, res, next) => {
  logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::getRooms::is called`);
  try{
    const { error } = Joi.validate(req.query, ManageGetRoomsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { roomType, view, isBooked } = req.query;
    const rooms = await RoomsServices.getRoomsHasCondistions({code: roomType, view, isBooked});

    logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::getRooms::success`);
    return res.status(HttpStatus.OK).json({
      message: RoomsConstant.MESSSAGES.GET_ROOMS.GET_ROOMS_SUCCESS,
      rooms
    });
  }catch(e){
    logger.error(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::getRooms::error`, e);
    return next(e);
  }
};

const createRoom = async (req, res, next) => {
  logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::createRoom::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateRoomValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { code, roomTypeId } = req.body;
    const room = await RoomsServices.findRoomsByCode(code);

    if(room)
    {
      logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::createRoom::room exists.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: RoomsConstant.MESSSAGES.CREATE_ROOMS.CODE_EXISTS,
      });
    }

    const roomType = await RoomTypesServices.findRoomTypeById(roomTypeId);

    if(!roomType)
    {
      logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::createRoom::room type not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: RoomsConstant.MESSSAGES.CREATE_ROOMS.ROOM_TYPES_NOT_FOUND,
      });
    }

    const newRoom = await RoomsServices.createRoom({code, roomType});
    let roomJsonParse = JSON.parse(JSON.stringify(newRoom));
    roomJsonParse[ModelsConstant.ROOMS_THROUGH_ROOM_TYPES]  = roomType;
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.ROOM.CREATE, description: JSON.stringify(roomJsonParse)});

    logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::createRoom::success`);
    return res.status(HttpStatus.OK).json({
      message: RoomsConstant.MESSSAGES.CREATE_ROOMS.CREATE_ROOMS_SUCCESS,
      room: roomJsonParse
    });
  }catch(e){
    logger.error(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::createRoom::error`, e);
    return next(e);
  }
};

const updateRoom = async (req, res, next) => {
  logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::updateRoom::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdateRoomValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { code, roomTypeId, roomId, isBooked } = req.body;
    const roomWhenFindById = await RoomsServices.getRoomById(roomId);
    let roomType = null;

    if(!roomWhenFindById)
    {
      logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::updateRoom::room not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: RoomsConstant.MESSSAGES.UPDATE_ROOMS.ROOM_NOT_FOUND,
      });
    }

    if(code)
    {
      const roomWhenFindByCode = await RoomsServices.findRoomsByCode(code);
      if(roomWhenFindByCode)
      {
        if(roomWhenFindById.id != roomWhenFindByCode.id)
        {
          logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::updateRoom::room exists.`);
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: RoomsConstant.MESSSAGES.UPDATE_ROOMS.CODE_EXISTS,
          });
        }
      }
    }

    if(roomTypeId)
    {
      roomType = await RoomTypesServices.findRoomTypeById(roomTypeId);

      if(!roomType)
      {
        logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::updateRoom::room type not found.`);
        return res.status(HttpStatus.NOT_FOUND).json({
          message: RoomsConstant.MESSSAGES.CREATE_ROOMS.ROOM_TYPES_NOT_FOUND,
        });
      }
    }

    let roomInfo = {
      oldRoom: roomWhenFindById
    };
    let room = await RoomsServices.updateRoom({room: roomWhenFindById, code, isBooked, typeId: roomTypeId});
    roomInfo['room'] = room;
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.ROOM.UPDATE, description: JSON.stringify(roomInfo)});

    if(roomType)
    {
      room = JSON.parse(JSON.stringify(room));
      room[ModelsConstant.ROOMS_THROUGH_ROOM_TYPES] = roomType;
    }

    logger.info(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::updateRoom::success`);
    return res.status(HttpStatus.OK).json({
      message: RoomsConstant.MESSSAGES.UPDATE_ROOMS.UPDATE_ROOMS_SUCCESS,
      room
    });
  }catch(e){
    logger.error(`${RoomsConstant.LOGGER.MANAGE_ROOMS_CONTROLLERS}::updateRoom::error`, e);
    return next(e);
  }
}

module.exports = {
  getRooms,
  createRoom,
  updateRoom
};