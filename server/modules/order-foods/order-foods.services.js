const log4js = require('log4js');
const logger = log4js.getLogger('Sevices');

const OrderFoodsModel = require('./order-foods.model');
const OrderFoodsConstant = require('./order-foods.constant');

const createOrderFoods = async ({ bookingFoods, foods }) => {
  logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_SERVICES}::createOrderFoods::is called`);
  try{
    let orderFoods = [];
    await Promise.all(
      foods.map(async food => {
        const newOrderFood = new OrderFoodsModel({
          bookingFoodsId: bookingFoods.id,
          foodId: food.foodId,
          number: food.number
        });

        logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_SERVICES}::createOrderFoods::creating order Food `, {food: food.foodId, number: food.number});
        await newOrderFood.save();
        orderFoods.push(newOrderFood);
      })
    );

    return orderFoods;
  }catch(e){
    logger.error(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_SERVICES}::createOrderFoods::error`);
    throw new Error(e);
  }
};

const mapFoodsDataWithOrderFoods = ({bookingFood, orderFoods, foods}) => {
  logger.info(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_SERVICES}::mapFoodsDataWithOrderFoods::is called`);
  try{
    let bookingFoodJsonParse = JSON.parse(JSON.stringify(bookingFood));
    let orderFoodsJsonParse = JSON.parse(JSON.stringify(orderFoods));
    let foodsJsonParse = JSON.parse(JSON.stringify(foods));

    let bookingFoodInfo = {
      bookingFoodInfo: {},
      totalBookingFoodPrice: 0
    };

    delete bookingFoodJsonParse.staffId;
    delete bookingFoodJsonParse.bookingId;
    delete bookingFoodJsonParse.updatedAt;
    delete bookingFoodJsonParse.deletedAt;

    bookingFoodJsonParse['foods'] = orderFoodsJsonParse.map(orderFood => {
      let food = foodsJsonParse.filter(foodInfo => foodInfo.id == orderFood.foodId);
      
      if(food.length > 0)
      {
        let foodInfo = JSON.parse(JSON.stringify(food[0]));
        delete orderFood.id;
        delete orderFood.foodId;
        delete orderFood.createdAt;
        delete orderFood.updatedAt;
        delete orderFood.deletedAt;
        delete orderFood.bookingFoodsId;

        delete foodInfo.id;
        delete foodInfo.createdAt;
        delete foodInfo.updatedAt;
        delete foodInfo.deletedAt;

        orderFood['food'] = foodInfo;
        const totalFoodPrice = orderFood.number * foodInfo.price;
        orderFood['totalFoodPrice'] = totalFoodPrice;
      }

      return orderFood;
    });
    
    bookingFoodInfo.bookingFoodInfo = bookingFoodJsonParse;
    bookingFoodInfo.totalBookingFoodPrice = bookingFoodJsonParse['foods'].reduce((price, orderFood) => {
      return price += orderFood.totalFoodPrice;
    }, 0);
    
    return bookingFoodInfo;
  }catch(e){
    logger.error(`${OrderFoodsConstant.LOGGER.ORDER_FOODS_SERVICES}::mapFoodsDataWithOrderFoods::error`);
    throw new Error(e);
  }
};

module.exports = {
  createOrderFoods,
  mapFoodsDataWithOrderFoods
}