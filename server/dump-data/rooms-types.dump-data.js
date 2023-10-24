const RoomTypesModel = require('../modules/room-types/room-types.model');
const RoomTypesConstant = require('../modules/room-types/room-types.contant');
const DumpDataConstant = require('../dump-data/dump-data.constant');
const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const createRoomTypes = async () => {
  logger.info(`${DumpDataConstant.LOGGER.ROOM_TYPES}::createRoomTypes::Is called`);
  try {
    const roomTypes = [
      RoomTypesConstant.TYPES.ONE_BED,
      RoomTypesConstant.TYPES.TWO_BEDS,
      RoomTypesConstant.TYPES.THREE_BEDS
    ]

    const config = {
       [RoomTypesConstant.TYPES.ONE_BED]: {
        code: RoomTypesConstant.TYPES.ONE_BED,
        name: 'Một giường ngủ',
        numOfBeds: 1,
        price: 200000,
        view: RoomTypesConstant.VIEW.SEA
       },
       [RoomTypesConstant.TYPES.TWO_BEDS]: {
        code: RoomTypesConstant.TYPES.TWO_BEDS,
        name: 'Hai giường ngủ',
        numOfBeds: 2,
        price: 350000,
        view: RoomTypesConstant.VIEW.POOL
       },
       [RoomTypesConstant.TYPES.THREE_BEDS]: {
        code: RoomTypesConstant.TYPES.THREE_BEDS,
        name: 'Ba giường ngủ',
        numOfBeds: 3,
        price: 500000,
        view: RoomTypesConstant.VIEW.CITY
       }
    };

    await Promise.all(
      roomTypes.map(async type => {
        const roomType = await RoomTypesModel.findOne( { where: { code: type } } );

        if (!roomType) {
          logger.info(`${DumpDataConstant.LOGGER.ROOM_TYPES}::createRoomTypes::creating ${type}`);
          const newRoomType = new RoomTypesModel(config[type]);
          await newRoomType.save();
        }
      })
    );

    logger.info(`${DumpDataConstant.LOGGER.ROOM_TYPES}::createRoomTypes::success`);
    return;
  } catch (e) {
    logger.error(`${DumpDataConstant.LOGGER.ROOM_TYPES}::createRoomTypes::error`, e);
    throw new Error(e);
  }
};

module.exports = async () => {
  await createRoomTypes();
}