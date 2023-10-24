const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const UserOrderFoodsConstant = require('./users-order-foods.constant');
const UserOrderFoodsModel = require('./users-orders-foods.model');

const createUserOrderFoods = async ({foods, userOrder}) => {
  logger.info(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::createUserOrderFoods::is called`);
  try{
    let createOrderFoods = [];

    await Promise.all(
      foods.map(async food => {
        const newUserOrderFood = new UserOrderFoodsModel({
          usersOderId: userOrder.id,
          foodId: food.foodId,
          number: food.number
        });

        logger.info(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::createUserOrderFoods::creating user order food`, {food: food.id, number: food.number});
        await newUserOrderFood.save();
        createOrderFoods.push(newUserOrderFood);
      })
    );

    return createOrderFoods;
  }catch(e){
    logger.error(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::createUserOrderFoods::error`, e);
    throw new Error(e);
  }
};

const mapFoodsAndUsersOrderFoods = ({foods, usersOrderFoods}) => {
  logger.info(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::mapFoodsAndUsersOrderFoods::is called`);
  try{
    let orderFoods = {
      usersOrderFoodsInfo: [],
      totalFoodsPrice: 0
    };

    const UserOrderFoodsJsonParse = JSON.parse(JSON.stringify(usersOrderFoods));
    const foodsJsonParse = JSON.parse(JSON.stringify(foods));

    orderFoods['usersOrderFoodsInfo'] = UserOrderFoodsJsonParse.map(usersOrderFood => {
      let foodFilter = foodsJsonParse.filter(food => food.id == usersOrderFood.foodId);

      if(foodFilter.length > 0)
      {
        let food = foodFilter[0];
        delete usersOrderFood.id;
        delete usersOrderFood.foodId;
        delete usersOrderFood.usersOderId;
        delete usersOrderFood.createdAt;
        delete usersOrderFood.updatedAt;
        delete usersOrderFood.deletedAt;

        delete food.id;
        delete food.createdAt;
        delete food.updatedAt;
        delete food.deletedAt;

        const totalFoodPrice = usersOrderFood.number * food.price;

        return {...usersOrderFood, ...food, totalFoodPrice};
      }
    });

    orderFoods['totalFoodsPrice']  = orderFoods['usersOrderFoodsInfo'] .reduce((price, usersOrderFoods) => {
      return price += usersOrderFoods.totalFoodPrice;
    }, 0);

    return orderFoods;
  }catch(e){
    logger.error(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::mapFoodsAndUsersOrderFoods::error`, e);
    throw new Error(e);
  }
};

const mapUserOrderData = (userOrder) => {
  logger.info(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::mapUserOrderData::is called`);
  try{
    let userOrderJsonParse = JSON.parse(JSON.stringify(userOrder));

    delete userOrderJsonParse.staffId;
    delete userOrderJsonParse.updatedAt;
    delete userOrderJsonParse.deletedAt;

    return userOrderJsonParse;
  }catch(e){
    logger.error(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::mapUserOrderData::error`, e);
    throw new Error(e);
  }
};

const mapStaffData = (staff) => {
  logger.info(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::mapStaffData::is called`);
  try{
    let staffJsonParse = JSON.parse(JSON.stringify(staff));

    delete staffJsonParse.id;
    delete staffJsonParse.password;
    delete staffJsonParse.permissionId;
    delete staffJsonParse.createdAt;
    delete staffJsonParse.updatedAt;
    delete staffJsonParse.deletedAt;

    return staffJsonParse;
  }catch(e){
    logger.error(`${UserOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_SERVICES}::mapStaffData::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  createUserOrderFoods,
  mapFoodsAndUsersOrderFoods,
  mapUserOrderData,
  mapStaffData
}