const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const RoomTypesModel = require('./room-types.model');
const RoomTypesConstant = require('./room-types.contant');

const getRoomTypes = async ({ code, view }) => {
  logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::getRoomTypes::is called`);
  try{
    let queryConditions = {};

    if(code){
      queryConditions['code'] = code;
    }

    if(view){
      queryConditions['view'] = view;
    }

    logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::getRoomTypes::success`);
    return await RoomTypesModel.findAll({
      where: queryConditions
    });
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::getRoomTypes::error`, e);
    throw new Error(e);
  }
};

const findRoomTypeById = async (roomTypeId) => {
  logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::findRoomTypeById::is called`);
  try{
    logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::findRoomTypeById::success`);
    return await RoomTypesModel.findOne({
      where: {
        id: roomTypeId
      }
    });
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::findRoomTypeById::error`, e);
    throw new Error(e);
  }
};

const findRoomTypeByCodeAndView = async ({code, view}) => {
  logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::findRoomTypeByCodeAndView::is called`);
  try{
    logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::findRoomTypeByCodeAndView::success`);
    return await RoomTypesModel.findOne({
      where: {
        code,
        view
      }
    });
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::findRoomTypeByCodeAndView::error`, e);
    throw new Error(e);
  }
};

const createRoomType = async ({roomType, view, price}) => {
  logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::createRoomType::is called`);
  try{
    const roomTypeInfo = detectRoomType(roomType);
    const newRoomType = new RoomTypesModel({
      ...roomTypeInfo,
      price,
      view
    });
    
    logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::createRoomType::success`);
    return await newRoomType.save();
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::createRoomType::error`, e);
    throw new Error(e);
  }
};

const detectRoomType = (roomType) => {
  logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::detectRoomType::is called`);
  try{
    let roomTypeInfo ={};

    switch (roomType) {
      case RoomTypesConstant.TYPES.ONE_BED:
        roomTypeInfo['code'] = RoomTypesConstant.TYPES.ONE_BED;
        roomTypeInfo['name'] = RoomTypesConstant.NAME.ONE_BED;
        roomTypeInfo['numOfBeds'] = RoomTypesConstant.NUMBER_OF_BED.ONE_BED;
        break;
      case RoomTypesConstant.TYPES.TWO_BEDS:
        roomTypeInfo['code'] = RoomTypesConstant.TYPES.TWO_BEDS;
        roomTypeInfo['name'] = RoomTypesConstant.NAME.TWO_BEDS;
        roomTypeInfo['numOfBeds'] = RoomTypesConstant.NUMBER_OF_BED.TWO_BEDS;
        break;
      case RoomTypesConstant.TYPES.THREE_BEDS:
        roomTypeInfo['code'] = RoomTypesConstant.TYPES.THREE_BEDS;
        roomTypeInfo['name'] = RoomTypesConstant.NAME.THREE_BEDS;
        roomTypeInfo['numOfBeds'] = RoomTypesConstant.NUMBER_OF_BED.THREE_BEDS;
        break; 
      default:
        break;
    };

    logger.info(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::detectRoomType::success`);
    return roomTypeInfo;
  }catch(e){
    logger.error(`${RoomTypesConstant.LOGGER.ROOM_TYPES_SERVICES}::detectRoomType::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  getRoomTypes,
  findRoomTypeById,
  findRoomTypeByCodeAndView,
  createRoomType
};