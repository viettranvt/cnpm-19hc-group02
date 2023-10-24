const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const BookingFoodsServices = require('./booking-foods.services');
const BookingFoodsConstant = require('./booking-foods.constant');
const BookingsServices = require('../bookings/bookings.services');
const ModelConstant = require('../../models/models.constant');
const StaffServices = require('../staffs/staffs.services');

const { GetBookingFoodsValidationSchema } = require('./validations/get-booking-foods.schema');
const { UpdateConfirmedValidationSchema } = require('./validations/update-confirmed.schema');

const getBookingFoods = async (req, res, next) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::getBookingFoods::is called`);
  try{
    const { error } = Joi.validate(req.query, GetBookingFoodsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { bookingId } = req.query;
    const booking = await BookingsServices.findBookingById(bookingId);

    if(!booking)
    {
      logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::getBookingFoods::booking not found`);
      return res.status(HttpStatus.OK).json({
        message: BookingFoodsConstant.MESSAGES.GET_LIST_BOOKING_FOODS.GET_LIST_BOOKING_FOODS_SUCCESS,
        bookingFoods: []
      });
    }

    if(booking[ModelConstant.BOOKINGS_THROUGH_BOOKING_FOODS].length == 0)
    {
      logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::getBookingFoods::booking foods is empty`);
      return res.status(HttpStatus.OK).json({
        message: BookingFoodsConstant.MESSAGES.GET_LIST_BOOKING_FOODS.GET_LIST_BOOKING_FOODS_SUCCESS,
        bookingFoods: []
      });
    }

    const bookingFoods = booking[ModelConstant.BOOKINGS_THROUGH_BOOKING_FOODS];
    const mapBookingFoodsData = BookingFoodsServices.mapBookingFoodsData(bookingFoods); 

    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::getBookingFoods::get booking foods success`);
    return res.status(HttpStatus.OK).json({
      message: BookingFoodsConstant.MESSAGES.GET_LIST_BOOKING_FOODS.GET_LIST_BOOKING_FOODS_SUCCESS,
      bookingFoods: mapBookingFoodsData
    })
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::getBookingFoods::error`, e);
    return next(e);
  }
};

const updateConfirmed = async (req, res, next) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::updateConfirmed::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdateConfirmedValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { bookingFoodId } = req.body;
    const bookingFood = await BookingFoodsServices.findBookingFoodsById(bookingFoodId);

    if(!bookingFood)
    {
      logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::updateConfirmed::booking food not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BookingFoodsConstant.MESSAGES.UPDATE_CONFIRMED.BOOKING_FOOD_NOT_FOUND
      });
    }

    if(bookingFood.isConfirmed)
    {
      logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::updateConfirmed::booking food is confirmed.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: BookingFoodsConstant.MESSAGES.UPDATE_CONFIRMED.BOOKING_FOOD_IS_COMFIRMED
      });
    }

    bookingFood.isConfirmed = true;
    await bookingFood.save();
    const mapData = BookingFoodsServices.mapBookingFoodData(bookingFood);

    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::updateConfirmed::update confirmed success.`);
    return res.status(HttpStatus.OK).json({
      message: BookingFoodsConstant.MESSAGES.UPDATE_CONFIRMED.UPDATE_CONFIRMED_SUCCESS,
      bookingFood: mapData
    });
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_CONTROLLERS}::updateConfirmed::error`, e);
    return next(e);
  }
};

module.exports = {
  getBookingFoods,
  updateConfirmed
};