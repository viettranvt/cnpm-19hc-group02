const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const BookingFoodsServices = require('../booking-foods/booking-foods.services');
const OrderFoodsConstant = require('./order-foods.constant');
const OrderFoodsServices = require('./order-foods.services');
const BookingServices = require('../bookings/bookings.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');
const FoodsServices = require('../foods/foods.services');
const StaffServices = require('../staffs/staffs.services');
const ModelConstant = require('../../models/models.constant');
const BillsServices = require('../bills/bills.services');
const Services = require('../../services/services');

const { CreateOrderFoodsValidationSchema } = require('./validations/create-order-foods.schema');

const createOrderFoods = async (req, res, next) => {
  logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateOrderFoodsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { bookingId, foods } = req.body;
    const mapStaffData = StaffServices.mapStaffData(req.staff);

    if(foods.length == 0)
    {
      logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::Foods is empty`);
      return res.status(HttpStatus.OK).json({
        message: OrderFoodsConstant.MESSAGES.CREATE_ORDER_FOODS.ORDER_FOODS_SUCCESS,
        bookingFood: {
          bookingFoodInfo: {},
          totalBookingFoodPrice: 0
        },
        staff: mapStaffData
      });
    }

    const booking = await BookingServices.findBookingById(bookingId);

    if(!booking)
    {
      logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::booking not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: OrderFoodsConstant.MESSAGES.CREATE_ORDER_FOODS.BOOKING_NOT_FOUND
      });
    }

    if(booking[ModelConstant.BOOKINGS_THROUGH_BILLS] && booking[ModelConstant.BOOKINGS_THROUGH_BILLS].isPayment)
    {
      logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::the bill has been paid`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: OrderFoodsConstant.MESSAGES.CREATE_ORDER_FOODS.THE_BILL_HAS_BEEN_PAID
      });
    }

    const foodIds = foods.map(food => food.foodId).filter(Services.onlyUnique);
    const foodsResult = await FoodsServices.findFoodsById(foodIds);

    if(foodIds.length != foodsResult.length)
    {
      logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::foods not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: OrderFoodsConstant.MESSAGES.CREATE_ORDER_FOODS.FOOD_NOT_FOUND
      });
    }

    logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::create booking foods`);
    let bookingFoods = await BookingFoodsServices.createBookingFoods({ booking, staff: req.staff });
    await StaffActivitiesServices.createStaffActivities({ staff: req.staff, name: StaffActivitiesConstant.NAME.BOOKING_FOODS.CREATE, description: JSON.stringify(bookingFoods) });

    const orderFoods = await OrderFoodsServices.createOrderFoods({bookingFoods, foods});
    const mapDataFoodWithOrderFood = OrderFoodsServices.mapFoodsDataWithOrderFoods({foods: foodsResult, orderFoods, bookingFood: bookingFoods});

    if(booking[ModelConstant.BOOKINGS_THROUGH_BILLS] && !booking[ModelConstant.BOOKINGS_THROUGH_BILLS].isPayment)
    {
      logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::update bill`);
      const bill = booking[ModelConstant.BOOKINGS_THROUGH_BILLS];
      const amount = bill.amount + mapDataFoodWithOrderFood.totalBookingFoodPrice;
      await BillsServices.updatePriceForBill({billId: bill.id, amount});
    }

    logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::success`);
    return res.status(HttpStatus.OK).json({
      message: OrderFoodsConstant.MESSAGES.CREATE_ORDER_FOODS.ORDER_FOODS_SUCCESS,
      bookingFood: mapDataFoodWithOrderFood,
      staff: mapStaffData
    });
  }catch(e){
    logger.error(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_CONTROLLERS}::createOrderFood::error`, e);
    return next(e)
  }
};

module.exports = {
  createOrderFoods
}
