const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const BookingFoodsServices = require('../booking-foods/booking-foods.services');
const BillsConstant = require('./bills.constant');
const ModelConstant = require('../../models/models.constant');
const BillsServices = require('./bills.services');
const BookingServices = require('../bookings/bookings.services');
const roomsServices = require('../rooms/rooms.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');
const StaffServices = require('../staffs/staffs.services');

const { CreateBillsValidationSchema } = require('./validations/create-bills.schema');
const { GetBillInfoValidationSchema } = require('./validations/get-bill-info.schema');

const createBill = async (req, res, next) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::is called.`);
  try{
    const { error } = Joi.validate(req.body, CreateBillsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { notes, paymentType, bookingId } = req.body;

    let booking = await BookingServices.findBookingById(bookingId);

    if(!booking)
    {
      logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::booking not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BillsConstant.MESSAGES.CREATE_BILL.BOOKING_NOT_FOUND
      });
    }

    let bill = booking[ModelConstant.BOOKINGS_THROUGH_BILLS];

    if(!booking[ModelConstant.BOOKINGS_THROUGH_BILLS])
    {
      logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::Create bill.`);
      bill = await BillsServices.createBills({booking, paymentType, notes, paymentDate: new Date(), isPayment: true});
    }

    if(booking[ModelConstant.BOOKINGS_THROUGH_BILLS] && booking[ModelConstant.BOOKINGS_THROUGH_BILLS].isPayment)
    {
      logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::The bill has been paid.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: BillsConstant.MESSAGES.CREATE_BILL.THE_BILL_HAS_BEEN_PAID
      });
    }
    
    if(booking[ModelConstant.BOOKINGS_THROUGH_BILLS] && !booking[ModelConstant.BOOKINGS_THROUGH_BILLS].isPayment)
    {
      logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::Update bill.`);
      await BillsServices.updatePaymentForBill({billId: bill.id, notes, paymentType, paymentDate: new Date(), isPayment: true});
      bill.paymentDate = new Date();
      bill.paymentType = paymentType;
      bill.notes = notes;
      bill.isPayment = true;
    }

    // const bookingFoods = booking[ModelConstant.BOOKINGS_THROUGH_BOOKING_FOODS];

    // if(bookingFoods.length > 0)
    // {
    //   const bookingFoodIds = bookingFoods.map(bookingFood => bookingFood.id);
    //   await BookingFoodsServices.updateIsConfirmedStatusByIds(bookingFoodIds);
    // }

    const roomId = booking.roomId;
    await roomsServices.updateIsBookedStatusByids([roomId]);
    booking.isCheckOut = true;
    await booking.save();
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.BILLS.CREATE, description: JSON.stringify(bill)});

    let bookingJsonParse = JSON.parse(JSON.stringify(booking));
    bookingJsonParse.bill = bill;

    let info = BillsServices.mapReponseData(bookingJsonParse);
    info['staff'] = StaffServices.mapStaffData(req.staff);

    return res.status(HttpStatus.OK).json({
      message: BillsConstant.MESSAGES.CREATE_BILL.CREATE_BILL_SUCCESS,
      info
    });
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::error.`, e);
    return next(e);
  }
};

const getBillInfo = async (req, res, next) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::getBillInfo::is called.`);
  try{
    const { error } = Joi.validate(req.query, GetBillInfoValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { bookingId } = req.query;
    let booking = await BookingServices.findBookingById(bookingId);

    if(!booking)
    {
      logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::booking not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: BillsConstant.MESSAGES.GET_BILL_INFO.BOOKING_NOT_FOUND
      });
    }

    if(!booking[ModelConstant.BOOKINGS_THROUGH_BILLS])
    {
      logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::create bills.`);
      const bill = await BillsServices.createBills({booking, paymentType: null, notes: null, paymentDate: null, isPayment: false});
      booking = JSON.parse(JSON.stringify(booking));
      booking[ModelConstant.BOOKINGS_THROUGH_BILLS] = bill;
    }

    let info = BillsServices.mapReponseData(booking);
    info['staff'] = StaffServices.mapStaffData(req.staff);

    logger.info(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::createBill::success.`);
    return res.status(HttpStatus.OK).json({
      message: BillsConstant.MESSAGES.GET_BILL_INFO.GET_BILL_INFO_SUCCESS,
      info
    });
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_CONTROLLERS}::getBillInfo::error.`, e);
    return next(e);
  }
};

module.exports = {
  createBill,
  getBillInfo
}