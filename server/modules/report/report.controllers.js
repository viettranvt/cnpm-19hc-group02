const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");
const moment = require('moment');

const BookingServices = require('../bookings/bookings.services');
const ReportConstant = require('./report.constant');
const ReportServices = require('./report.services');
const UserOrderServices = require('../users_orders/users-orders.services');

const { GetReportValidationSchema } = require('./validations/get_report.schema');
const { GetReportForRestaurantValidationSchema } = require('./validations/get_report_for_restaurant.schema');

const getReport = async (req, res, next) => {
  logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReport::is called`);
  try{
    const { error } = Joi.validate(req.query, GetReportValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }
    let {startDate, endDate, bookingId} = req.query;

    if(startDate && endDate)
    {
      startDate = moment(Number(startDate));
      endDate = moment(Number(endDate));
  
      if(startDate.isAfter(endDate))
      {
        logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReport::Start date is affter end date`);
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: ReportConstant.MESSAGES.MANAGE.GET_REPORT.START_DATE_IS_AFTER_END_DATE
        });
      }
    }

    const bookings = await BookingServices.getBookingsHasConditions({bookingId, startDate, endDate});

    if(bookings.length <= 0)
    {
      logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReport::empty report`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: ReportConstant.MESSAGES.MANAGE.GET_REPORT.EMPTY_REPORT_SUCCESS
      });
    }

    const bookingsData = ReportServices.mapData(bookings);
    const totalPrice = ReportServices.totalPrice(bookingsData);

    logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReport::success`);
    return res.status(HttpStatus.OK).json({
      message: ReportConstant.MESSAGES.MANAGE.GET_REPORT.GET_REPORT_SUCCESS,
      bookingsData,
      totalPrice
    });
  }catch(e){
    logger.error(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReport::error`, e);
    return next(e);
  }
};

const getReportForRestaurant = async (req, res, next) => {
  logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReportForRestaurant::is called`);
  try{
    const { error } = Joi.validate(req.query, GetReportForRestaurantValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }
    let {startDate, endDate} = req.query;

    if(startDate && endDate)
    {
      startDate = moment(Number(startDate));
      endDate = moment(Number(endDate));
  
      if(startDate.isAfter(endDate))
      {
        logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReportForRestaurant::Start date is affter end date`);
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: ReportConstant.MESSAGES.MANAGE.GET_REPORT.START_DATE_IS_AFTER_END_DATE
        });
      }
    }

    const userOrders = await UserOrderServices.getUserOrderHasConditions({startDate, endDate});

    if(userOrders.length <= 0)
    {
      logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReportForRestaurant::empty report`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: ReportConstant.MESSAGES.MANAGE.GET_REPORT.EMPTY_REPORT_SUCCESS
      });
    }

    const mapData = await ReportServices.mapDataForRestaurant(userOrders);

    logger.info(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReportForRestaurant::success`);
    return res.status(HttpStatus.OK).json({
      message: ReportConstant.MESSAGES.MANAGE.GET_REPORT.GET_REPORT_SUCCESS,
      bookingsData: mapData.bookingFoodsInfo,
      totalPrice: mapData.totalPrice
    });
  }catch(e){
    logger.error(`${ReportConstant.LOGGER.REPORT_CONTROLLERS}::getReportForRestaurant::error`, e);
    return next(e);
  }
};

module.exports = {
  getReport,
  getReportForRestaurant
};