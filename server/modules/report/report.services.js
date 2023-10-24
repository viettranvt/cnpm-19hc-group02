const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const BillsServices = require('../bills/bills.services');
const ModelContant = require('../../models/models.constant');
const ReportConstant = require('./report.constant');
const Services = require('../../services/services');
const FoodsServices = require('../foods/foods.services');
const UserOrderFoodsServices = require('../users-order-foods/users-order-foods.services');
const usersOders = require('../users_orders/users_orders.model');

const mapData = bookings => {
  logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapData::is called`);
  try{
    let bookingsJsonParse = JSON.parse(JSON.stringify(bookings));
    let bookingsData = [];
    bookingsData = bookingsJsonParse.map(booking => BillsServices.mapReponseData(booking));

    logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapData::success`);
    return bookingsData;
  }catch(e){
    logger.error(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapData::error`, e);
    throw new Error(e);
  }
};

const totalPrice = bookings => {
  logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::totalPrice::is called`);
  try{ 
    const totalPrice = bookings.reduce((price, booking) => {
      return price += booking[ModelContant.BOOKINGS_THROUGH_BILLS].amount
    }, 0);

    logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::totalPrice::success`);
    return totalPrice;
  }catch(e){
    logger.error(`${ReportConstant.LOGGER.REPORT_SERVICES}::totalPrice::error`, e);
    throw new Error(e);
  }
};

const mapDataForRestaurant = async userOrders => {
  logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapDataForRestaurant::is called`);
  try{ 
    const userOrdersFoodsJsonParse = JSON.parse(JSON.stringify(userOrders));
    const foodIds = getListFoodsFromUserOrderFoods(userOrdersFoodsJsonParse);

    if(foodIds.length == 0)
    {
      logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapDataForRestaurant::can not find bill`);
      throw new Error("Không tìm thấy hóa đơn.");
    }

    const foods = await FoodsServices.findFoodsById(foodIds);

    if(foods.length == 0)
    {
      logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapDataForRestaurant::can not find food`);
      throw new Error("Không tìm thấy thông tin thức ăn.");
    }

    let bookingFoodsInfo = userOrdersFoodsJsonParse.map(userOrder => {
      let userOrderFoods = userOrder[ModelContant.USERS_ORDERS_THROUGH_USERS_ORDERS_FOODS];
      let bill = userOrder[ModelContant.USERS_ORDERS_THROUGH_FOOD_BILLS];

      delete userOrder[ModelContant.USERS_ORDERS_THROUGH_USERS_ORDERS_FOODS];
      delete userOrder[ModelContant.USERS_ORDERS_THROUGH_FOOD_BILLS];

      return {
        userOrder: UserOrderFoodsServices.mapUserOrderData(userOrder),
        usersOrderFoods: UserOrderFoodsServices.mapFoodsAndUsersOrderFoods({foods, usersOrderFoods: userOrderFoods}),
        bill
      }
    });

    const totalPrice =  bookingFoodsInfo.reduce((price, booking) => {
      return price += booking.usersOrderFoods.totalFoodsPrice;
    }, 0);

    logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapDataForRestaurant::success`);
    return { bookingFoodsInfo, totalPrice };
  }catch(e){
    logger.error(`${ReportConstant.LOGGER.REPORT_SERVICES}::mapDataForRestaurant::error`, e);
    throw new Error(e);
  }
};

const getListFoodsFromUserOrderFoods = usersOders => {
  logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::getListFoodsFromUserOrderFoods::is called`);
  try{
    let foodsIds = [];
    usersOders.forEach(userOrder => {
      let foodIds = userOrder[ModelContant.USERS_ORDERS_THROUGH_USERS_ORDERS_FOODS].map(food => {
        return food.foodId;
      });

      foodsIds.push(...foodIds);
    });

    logger.info(`${ReportConstant.LOGGER.REPORT_SERVICES}::getListFoodsFromUserOrderFoods::success`);
    return foodsIds.filter(Services.onlyUnique);
  }catch(e){
    logger.error(`${ReportConstant.LOGGER.REPORT_SERVICES}::getListFoodsFromUserOrderFoods::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  mapData,
  totalPrice,
  mapDataForRestaurant
}