const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const BookingServicesServices = require('./booking-services.services');
const BookingServicesConstant = require('./booking-services.constant');
const ServicesServices = require('../services/services.services');
const BookingsServices = require('../bookings/bookings.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');
const ModelConstant = require('../../models/models.constant');
const StaffServices = require('../staffs/staffs.services');
const BillsServices = require('../bills/bills.services');
const Services = require('../../services/services');

const { CreateBookingServiceValidationSchema } = require('./validations/create-booking-service.schema');

const createBookingService = async (req, res, next) => {
  logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateBookingServiceValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { bookingId, services } = req.body;
    const staff = StaffServices.mapStaffData(req.staff);

    if(services.length == 0){
      logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::Service is empty`);
      return res.status(HttpStatus.OK).json({
        message: BookingServicesConstant.MESSAGES.CREATE_BOOKING_SERVICE.CREATE_BOOKING_SERVICE_SUCCESS,
        bookingServices: {
          bookingServicesInfo: [],
          totalBookingServicesPrice: 0
        },
        staff
      });
    }

    const serviceIds = services.map(service => service.serviceId).filter(Services.onlyUnique);
    const servicesResult = await ServicesServices.findServiceByIds(serviceIds);

    if(servicesResult.length != serviceIds.length){
      logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::Service not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BookingServicesConstant.MESSAGES.CREATE_BOOKING_SERVICE.SERVICE_NOT_FOUND
      });
    }

    const booking = await BookingsServices.findBookingById(bookingId);
    
    if(!booking)
    {
      logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::Booking not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BookingServicesConstant.MESSAGES.CREATE_BOOKING_SERVICE.BOOKING_NOT_FOUND
      });
    }

    if(booking[ModelConstant.BOOKINGS_THROUGH_BILLS] && booking[ModelConstant.BOOKINGS_THROUGH_BILLS].isPayment)
    {
      logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::The bill has been paid.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: BookingServicesConstant.MESSAGES.CREATE_BOOKING_SERVICE.THE_BILL_HAS_BEEN_PAID
      });
    }

    const newBookingServices = await BookingServicesServices.createBookingServices({staff: req.staff, booking, services});
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.BOOKING_SERVICES.CREATE, description: JSON.stringify(newBookingServices)});
    const bookingSerices = BookingServicesServices.mapServicesDataWithBookingServicesData({bookingServices: newBookingServices, services: servicesResult});

    if(booking[ModelConstant.BOOKINGS_THROUGH_BILLS] && !booking[ModelConstant.BOOKINGS_THROUGH_BILLS].isPayment)
    {
      logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::update bill.`);
      const bill = booking[ModelConstant.BOOKINGS_THROUGH_BILLS];
      const amount = bill.amount + bookingSerices.totalBookingServicesPrice;
      await BillsServices.updatePriceForBill({billId: bill.id, amount});
    }

    logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::Success`);
      return res.status(HttpStatus.OK).json({
        message: BookingServicesConstant.MESSAGES.CREATE_BOOKING_SERVICE.CREATE_BOOKING_SERVICE_SUCCESS,
        bookingSerices,
        staff
      });
  }catch(e){
    logger.error(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_CONSTROLLERS}::createBookingService::error`, e);
    return next(e);
  }
};

module.exports = {
  createBookingService
}