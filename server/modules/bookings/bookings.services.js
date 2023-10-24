const log4js = require('log4js');
const logger = log4js.getLogger('Services');
const HttpStatus = require("http-status-codes");

const BookingModel = require('./bookings.model');
const BookingsConstant = require('./bookings.constant');
const ModelConstant = require('../../models/models.constant');
const BillsModel = require('../bills/bills.model');
const BookingFoodsModel = require('../booking-foods/booking-foods.model');
const BookingServicesModel = require('../booking-services/booking-services.model');
const FoodsModel = require('../foods/foods.model');
const OrderFoodsModel = require('../order-foods/order-foods.model');
const RoomModel = require('../rooms/rooms.model');
const ServicesModel = require('../services/services.model');
const UsersModel = require('../users/users.model');
const RoomTypesModel = require('../room-types/room-types.model');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const createBooking = async ({user, room, staff, startDate, endDate, description, dayDistance}) => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::createBooking::is called.`);
  try{
    const roomType = room[ModelConstant.ROOMS_THROUGH_ROOM_TYPES];

    if(!roomType.price)
    {
      logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::createBooking::price not found.`);
      return { status: HttpStatus.BAD_REQUEST, message: BookingsConstant.MESSAGES.CREATE_BOOKING.ROOM_NOT_FOUND, booking: {} };
    }

    const newBooking = new BookingModel({
      roomId: room.id,
      userId: user.id,
      staffId: staff.id,
      price: roomType.price * dayDistance,
      description: description || '',
      startDate,
      endDate,
      isCheckOut: false
    });

    await newBooking.save();
    logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::createBooking::success.`);
    return { status: HttpStatus.OK, message: BookingsConstant.MESSAGES.CREATE_BOOKING.CREATE_BOOKING_SUCCESS, booking: newBooking };
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::createBooking::error.`, e);
    throw new Error(e);
  }
};

const findBookingById = async (bookingId) => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::findBookingById::is called.`);
  try{
    logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::findBookingById::success.`);
    return await BookingModel.findOne({
      where : { id: bookingId },
      include: [
        {
          model: BookingFoodsModel,
          as: ModelConstant.BOOKINGS_THROUGH_BOOKING_FOODS,
          duplicating: false,
          include: [{ 
            model: OrderFoodsModel,
            as: ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS,
            duplicating: false,
            include: [{ 
              model: FoodsModel,
              as: ModelConstant.ORDER_FOODS_THROUGH_FOODS,
              duplicating: false
            }]
          }]
        },
        {
          model: BookingServicesModel,
          as: ModelConstant.BOOKINGS_THROUGH_BOOKING_SERVICES,
          duplicating: false,
          include: [{ 
            model: ServicesModel,
            as: ModelConstant.BOOKINGS_SERVICES_THROUGH_SERVICES,
            duplicating: false
          }]
        },
        {
          model: BillsModel,
          as: ModelConstant.BOOKINGS_THROUGH_BILLS,
          duplicating: false
        },
        {
          model: RoomModel,
          as: ModelConstant.BOOKINGS_THROUGH_ROOMS,
          duplicating: false,
          include: [{ 
            model: RoomTypesModel,
            as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
            duplicating: false
          }]
        },
        {
          model: UsersModel,
          as: ModelConstant.BOOKINGS_THROUGH_USERS,
          duplicating: false
        }
      ]
    });
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::findBookingById::error.`, e);
    throw new Error(e);
  }
};

const getBookings = async () => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::getBookings::is called`);
  try{
    logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::getBookings::success.`);
    return await BookingModel.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: BillsModel,
          as: ModelConstant.BOOKINGS_THROUGH_BILLS,
          duplicating: false
        },
        {
          model: RoomModel,
          as: ModelConstant.BOOKINGS_THROUGH_ROOMS,
          duplicating: false,
          include: [{ 
            model: RoomTypesModel,
            as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
            duplicating: false
          }]
        },
        {
          model: UsersModel,
          as: ModelConstant.BOOKINGS_THROUGH_USERS,
          duplicating: false
        }
      ]
    });
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::getBookings::error.`, e);
    throw new Error(e);
  }
};

const filterBookingsData = ({ bookings, isPayment }) => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::filterBookingsData::is called`);
  try{
    let bookingsJsonParse = JSON.parse(JSON.stringify(bookings));

    if(isPayment == true | isPayment == 'true')
    {
      bookingsJsonParse = bookingsJsonParse.filter(booking => booking.isCheckOut);
    }

    if(isPayment == false | isPayment == 'false')
    {
      bookingsJsonParse = bookingsJsonParse.filter(booking => !booking.isCheckOut);
    }

    bookingsJsonParse = bookingsJsonParse.map(booking => {
      delete booking[ModelConstant.BOOKINGS_THROUGH_BILLS];
      return booking;
    });

    return bookingsJsonParse;
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::filterBookingsData::error.`, e);
    throw new Error(e);
  }
};

const getBookingsHasConditions = async ({bookingId, startDate, endDate}) => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::getBookingsHasConditions::is called`);
  try{
    let conditions = {};

    if(bookingId)
    {
      conditions['id'] = bookingId;
    }

    if(startDate && endDate)
    {
      conditions['createdAt'] = { 
          [Op.gt]: startDate,
          [Op.lt]: endDate
      }
    }

    logger.info(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::getBookingsHasConditions::success.`);
    return await BookingModel.findAll({
      order: [['id', 'DESC']],
      where: conditions,
      include: [
        {
          model: BookingFoodsModel,
          as: ModelConstant.BOOKINGS_THROUGH_BOOKING_FOODS,
          duplicating: false,
          include: [{ 
            model: OrderFoodsModel,
            as: ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS,
            duplicating: false,
            include: [{ 
              model: FoodsModel,
              as: ModelConstant.ORDER_FOODS_THROUGH_FOODS,
              duplicating: false
            }]
          }]
        },
        {
          model: BookingServicesModel,
          as: ModelConstant.BOOKINGS_THROUGH_BOOKING_SERVICES,
          duplicating: false,
          include: [{ 
            model: ServicesModel,
            as: ModelConstant.BOOKINGS_SERVICES_THROUGH_SERVICES,
            duplicating: false
          }]
        },
        {
          model: BillsModel,
          as: ModelConstant.BOOKINGS_THROUGH_BILLS,
          duplicating: false,
          where: { isPayment: true }
        },
        {
          model: RoomModel,
          as: ModelConstant.BOOKINGS_THROUGH_ROOMS,
          duplicating: false,
          include: [{ 
            model: RoomTypesModel,
            as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES,
            duplicating: false
          }]
        },
        {
          model: UsersModel,
          as: ModelConstant.BOOKINGS_THROUGH_USERS,
          duplicating: false
        }
      ]
    });
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_SERVICES}::getBookingsHasConditions::error.`, e);
    throw new Error(e);
  }
};

module.exports = {
  createBooking,
  findBookingById,
  getBookings,
  filterBookingsData,
  getBookingsHasConditions
}
