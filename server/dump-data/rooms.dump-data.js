const RoomsModel = require('../modules/rooms/rooms.model');
const RoomsConstant = require('../modules/rooms/rooms.constant');
const DumpDataConstant = require('../dump-data/dump-data.constant');
const RoomTypesModel = require('../modules/room-types/room-types.model');
const RoomTypesConstant = require('../modules/room-types/room-types.contant');
const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const createRooms = async () => {
  logger.info(`${DumpDataConstant.LOGGER.ROOMS}::createRooms::Is called`);
  try {
    const roomTypes = await RoomTypesModel.findAll();

    if(roomTypes.length <= 0)
    {
      logger.warn(`${DumpDataConstant.LOGGER.ROOMS}::createRooms::RoomTypes is empty`);
      return;
    }

    const oneBedRoomType = roomTypes.filter(roomType => roomType.code == RoomTypesConstant.TYPES.ONE_BED);
    const twoBedsRoomType = roomTypes.filter(roomType => roomType.code == RoomTypesConstant.TYPES.TWO_BEDS);
    const threeBedsRoomType = roomTypes.filter(roomType => roomType.code == RoomTypesConstant.TYPES.THREE_BEDS);

    const rooms = [
      RoomsConstant.CODE.ROOM_001,
      RoomsConstant.CODE.ROOM_002,
      RoomsConstant.CODE.ROOM_003,
      RoomsConstant.CODE.ROOM_004,
      RoomsConstant.CODE.ROOM_005,
      RoomsConstant.CODE.ROOM_006,
      RoomsConstant.CODE.ROOM_007,
      RoomsConstant.CODE.ROOM_008,
      RoomsConstant.CODE.ROOM_009,
      RoomsConstant.CODE.ROOM_010,
      RoomsConstant.CODE.ROOM_011,
      RoomsConstant.CODE.ROOM_012,
    ]

    const config = {
      [RoomsConstant.CODE.ROOM_001]: {
        code: RoomsConstant.CODE.ROOM_001,
        isBooked: false,
        typeId: oneBedRoomType.length > 0 ? oneBedRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_002]: {
        code: RoomsConstant.CODE.ROOM_002,
        isBooked: false,
        typeId: twoBedsRoomType.length > 0 ? twoBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_003]: {
        code: RoomsConstant.CODE.ROOM_003,
        isBooked: false,
        typeId: threeBedsRoomType.length > 0 ? threeBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_004]: {
        code: RoomsConstant.CODE.ROOM_004,
        isBooked: false,
        typeId: oneBedRoomType.length > 0 ? oneBedRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_005]: {
        code: RoomsConstant.CODE.ROOM_005,
        isBooked: false,
        typeId: twoBedsRoomType.length > 0 ? twoBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_006]: {
        code: RoomsConstant.CODE.ROOM_006,
        isBooked: false,
        typeId: threeBedsRoomType.length > 0 ? threeBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_007]: {
        code: RoomsConstant.CODE.ROOM_007,
        isBooked: false,
        typeId: oneBedRoomType.length > 0 ? oneBedRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_008]: {
        code: RoomsConstant.CODE.ROOM_008,
        isBooked: false,
        typeId: twoBedsRoomType.length > 0 ? twoBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_009]: {
        code: RoomsConstant.CODE.ROOM_009,
        isBooked: false,
        typeId: threeBedsRoomType.length > 0 ? threeBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_010]: {
        code: RoomsConstant.CODE.ROOM_010,
        isBooked: false,
        typeId: oneBedRoomType.length > 0 ? oneBedRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_011]: {
        code: RoomsConstant.CODE.ROOM_011,
        isBooked: false,
        typeId: twoBedsRoomType.length > 0 ? twoBedsRoomType[0].id : -1
      },
      [RoomsConstant.CODE.ROOM_012]: {
        code: RoomsConstant.CODE.ROOM_012,
        isBooked: false,
        typeId: threeBedsRoomType.length > 0 ? threeBedsRoomType[0].id : -1
      }
    };

    await Promise.all(
      rooms.map(async code => {
        const room = await RoomsModel.findOne( { where: { code } } );

        if (!room) {
          logger.info(`${DumpDataConstant.LOGGER.ROOMS}::createRooms::creating room ${code}`);
          const newRoom = new RoomsModel(config[code]);
          await newRoom.save();
        }
      })
    );

    logger.info(`${DumpDataConstant.LOGGER.ROOMS}::createRooms::success`);
    return;
  } catch (e) {
    logger.error(`${DumpDataConstant.LOGGER.ROOMS}::createRooms::error`, e);
    throw new Error(e);
  }
};

module.exports = async () => {
  await createRooms();
}