const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");
const moment = require('moment');

const BookingsServices = require('./bookings.services');
const BookingsConstant = require('./bookings.constant');
const UsersServices = require('../users/users.service');
const RoomsServices = require('../rooms/rooms.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { CreateBookingValidationSchema } = require('./validations/create-booking.schema');
const { GetBookingsValidationSchema } = require('./validations/get_bookings.schema');

const createBooking = async (req, res, next) => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateBookingValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { userId, roomId, startDate, endDate, description } = req.body;

    startDate = moment(Number(startDate));
    endDate = moment(Number(endDate));

    if(startDate.isAfter(endDate))
    {
      logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::Start date is affter end date`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: BookingsConstant.MESSAGES.CREATE_BOOKING.START_DATE_IS_AFTER_END_DATE
      });
    }

    const user = await UsersServices.findUserById(userId);

    if(!user)
    {
      logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::user not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BookingsConstant.MESSAGES.CREATE_BOOKING.USER_NOT_FOUND
      });
    }

    const room = await RoomsServices.getRoomById(roomId);

    if(!room)
    {
      logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::room not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BookingsConstant.MESSAGES.CREATE_BOOKING.ROOM_NOT_FOUND
      });
    }

    if(room.isBooked)
    {
      logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::room was booked`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: BookingsConstant.MESSAGES.CREATE_BOOKING.ROOM_WAS_BOOKED
      });
    }

    let dayDistance = Math.ceil(endDate.diff(startDate, 'day', true));
    dayDistance = dayDistance == 0 ? 1 : dayDistance;
    const newBoking = await BookingsServices.createBooking({user, room, staff: req.staff, startDate, endDate, description, dayDistance});
    room.isBooked = true;
    await room.save();
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.BOOKING.CREATE, description: JSON.stringify(newBoking.booking)});

    logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::success`);
    return res.status(newBoking.status).json({
      message: newBoking.message,
      booking: newBoking.booking
    });
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::createBooking::error`, e);
    return next(e);
  }
};

const getBookings = async (req, res, next) => {
  logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::getBookings::is called`);
  try{
    const { error } = Joi.validate(req.query, GetBookingsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }
    const { isPayment } = req.query;
    let bookings = await BookingsServices.getBookings();
    bookings = BookingsServices.filterBookingsData({bookings, isPayment});

    logger.info(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::getBookings::success`);
    return res.status(HttpStatus.OK).json({
      message: BookingsConstant.MESSAGES.GET_BOOKINGS.GET_BOOKINGS_SUCCESS,
      bookings
    });
  }catch(e){
    logger.error(`${BookingsConstant.LOGGER.BOOKINGS_CONTROLLERS}::getBookings::error`, e);
    return next(e);
  }
}

module.exports = {
  createBooking, 
  getBookings
}