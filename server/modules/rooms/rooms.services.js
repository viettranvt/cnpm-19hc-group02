const log4js = require('log4js');
const logger = log4js.getLogger('Services');
const Sequelize = require('sequelize');

const Constant = require('./rooms.constant');
const Rooms = require('./rooms.model');
const RoomsTypeModel = require('../room-types/room-types.model');
const ModelConstant = require('../../models/models.constant');

const getRooms = async ({isBooked, roomType}) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::getRooms::Is called`);
  try {
    let queryConditions = {
      isBooked: {},
      roomType: {}
    };

    if(isBooked == 'true' || isBooked == true || isBooked == 'false' || isBooked == false)
    {
      queryConditions.isBooked = { isBooked };
    }
    
    if(roomType)
    {
      queryConditions.roomType = { code: roomType };
    }

    let rooms = await Rooms.findAll({
      where: queryConditions.isBooked,
      include: [
        {
          model: RoomsTypeModel,
          as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
          duplicating: false,
          where: queryConditions.roomType
        }
      ]
    });
    logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::getRooms::success`);
    return rooms;
  } catch (e) {
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::getRooms::Error`, e);
    throw new Error(e);
  }
};

const getRoomById = async (roomId) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::getRoomById::Is called`);
  try {
    logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::getRoomById::success`);
    return await Rooms.findOne({
      where: {
        id: roomId
      },
      include: [{
        model: RoomsTypeModel,
        as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
        duplicating: false
      }]
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::getRoomById::Error`, e);
    throw new Error(e);
  }
};

const updateIsBookedStatusByids = async (roomIds) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::updateIsBookedStatus::Is called`);
  try{
    return await Rooms.update(
      { isBooked: false },
      { where: { id: { [Sequelize.Op.in]: roomIds } } }
    );
  }catch(e){
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::updateIsBookedStatus::Error`, e);
    throw new Error(e);
  }
};

const getRoomsHasCondistions = async ({code, view, isBooked}) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::getRoomsHasCondistions::Is called`);
  try{
    let queryConditions = {
      roomsConditions: {},
      roomTypesConditions: {}
    };

    if(isBooked == true || isBooked == 'true' || isBooked == 'false' || isBooked == false){
      queryConditions.roomsConditions['isBooked'] = isBooked;
    }

    if(code){
      queryConditions.roomTypesConditions['code'] = code;
    }

    if(view){
      queryConditions.roomTypesConditions['view'] = view;
    }

    logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::getRoomsHasCondistions::success`);
    return await Rooms.findAll({
      where: queryConditions.roomsConditions,
      include: [{
        model: RoomsTypeModel,
        as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
        duplicating: false,
        where: queryConditions.roomTypesConditions
      }]
    });
  }catch(e){
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::getRoomsHasCondistions::Error`, e);
    throw new Error(e);
  }
};

const findRoomsByCode = async (code) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::findRoomsByCode::Is called`);
  try{
    logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::findRoomsByCode::Is called`);
    return await Rooms.findOne({
      where: { code },
      include: [{
        model: RoomsTypeModel,
        as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
        duplicating: false
      }]
    });
  }catch(e){
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::findRoomsByCode::Error`, e);
    throw new Error(e);
  }
};

const createRoom = async ({code, roomType}) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::createRoom::Is called`);
  try{
    const newRoom = new Rooms({
      code,
      typeId: roomType.id,
      isBooked: false
    });

    logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::createRoom::Is called`);
    return await newRoom.save();
  }catch(e){
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::createRoom::Error`, e);
    throw new Error(e);
  }
};

const updateRoom = async ({room, code, isBooked, typeId}) => {
  logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::updateRoom::Is called`);
  try{
    if(code){
      room.code = code;
    }

    if(isBooked == true || isBooked == 'true' || isBooked == 'false' || isBooked == false){
      room.isBooked = isBooked;
    }

    if(typeId)
    {
      room.typeId = typeId;
    }

    logger.info(`${Constant.LOGGER.ROOMS_SERVICES}::updateRoom::Is called`);
    return await room.save();
  }catch(e){
    logger.error(`${Constant.LOGGER.ROOMS_SERVICES}::updateRoom::Error`, e);
    throw new Error(e);
  }
}

module.exports = {
  getRooms,
  getRoomById,
  updateIsBookedStatusByids,
  getRoomsHasCondistions,
  findRoomsByCode,
  createRoom,
  updateRoom
};