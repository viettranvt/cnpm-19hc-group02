const log4js = require('log4js');
const logger = log4js.getLogger('Sevices');
const Sequelize = require('sequelize');

const BookingFoodsModel = require('./booking-foods.model');
const BookingFoodsConstant = require('./booking-foods.constant');
const OrderFoodsModel = require('../order-foods/order-foods.model');
const FoodsModel = require('../foods/foods.model');
const ModelConstant = require('../../models/models.constant');

const findBookingFoodsById = async (id) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::findBookingFoodsById::is called`);
  try{
    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::findBookingFoodsById::success`);
    return await BookingFoodsModel.findOne({ 
      where: { id },
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
    });
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::findBookingFoodsById::error`, e);
    throw new Error(e);
  }
};

const findBookingFoodsByBookingId = async (bookingId) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::findBookingFoodsByBookingId::is called`);
  try{
    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::findBookingFoodsByBookingId::success`);
    return await BookingFoodsModel.findOne({ 
      where: { bookingId },
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
    });
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::findBookingFoodsByBookingId::error`, e);
    throw new Error(e);
  }
};

const createBookingFoods = async ({ booking, staff }) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::createBookingFoods::is called`);
  try{
    const newBookingFoods = new BookingFoodsModel({
      bookingId: booking.id,
      staffId: staff.id,
      isConfirmed: true
    });
    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::createBookingFoods::success`);
    return await newBookingFoods.save();
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::createBookingFoods::error`, e);
    throw new Error(e);
  }
};

const updateIsConfirmedStatusByIds = async (bookingFoodIds) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::updateIsConfirmedStatusByIds::is called`);
  try{
    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::updateIsConfirmedStatusByIds::success`);
    return await BookingFoodsModel.update(
      { isConfirmed: true },
      { where: { id: { [Sequelize.Op.in]: bookingFoodIds } } }
    );
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::updateIsConfirmedStatusByIds::error`, e);
    throw new Error(e);
  }
};

const mapBookingFoodsData = (bookingFoods) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::mapBookingFoodsData::is called`);
  try{
    let bookingFoodsJsonParse = JSON.parse(JSON.stringify(bookingFoods));
    let bookingFoodsInfo = [];

    if(bookingFoodsJsonParse.length > 0)
    {
      bookingFoodsInfo = bookingFoodsJsonParse.map(bookingFood => {
        let orderFoods = bookingFood[ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS];
        let foodInfo = orderFoods.map(orderFood => {
          let food = orderFood[ModelConstant.ORDER_FOODS_THROUGH_FOODS];
          orderFood['totalFoodPrice'] = orderFood.number * food.price; 

          return {...orderFood};
        });

        bookingFood[ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS] = foodInfo;
        bookingFood['totalFoodsPrice'] = foodInfo.reduce((price, food) => {
          return price += food.totalFoodPrice;
        }, 0);

        return { ...bookingFood };
      });
    }

    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::mapBookingFoodsData::success`);
    return bookingFoodsInfo;
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::mapBookingFoodsData::error`, e);
    throw new Error(e);
  }
};

const mapBookingFoodData = (bookingFood) => {
  logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::mapBookingFoodData::is called`);
  try{
    let bookingFoodJsonParse = JSON.parse(JSON.stringify(bookingFood));

    if(bookingFoodJsonParse)
    {
      let orderFoods = bookingFoodJsonParse[ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS];
      let foodInfo = orderFoods.map(orderFood => {
        let food = JSON.parse(JSON.stringify(orderFood[ModelConstant.ORDER_FOODS_THROUGH_FOODS]));
        orderFood['totalFoodPrice'] = orderFood.number * food.price; 

        return {...orderFood};
      });

      bookingFoodJsonParse[ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS] = foodInfo;
      bookingFoodJsonParse['totalFoodsPrice'] = foodInfo.reduce((price, food) => {
        return price += food.totalFoodPrice;
      }, 0);
    }

    logger.info(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::mapBookingFoodData::success`);
    return bookingFoodJsonParse;
  }catch(e){
    logger.error(`${BookingFoodsConstant.LOGGER.BOOKING_FOODS_SERVICES}::mapBookingFoodData::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  findBookingFoodsById,
  findBookingFoodsByBookingId,
  createBookingFoods,
  updateIsConfirmedStatusByIds,
  mapBookingFoodsData,
  mapBookingFoodData
}