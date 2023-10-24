const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const UserOrderFoodsServices = require('./users-order-foods.services');
const UsersOrderFoodsConstant = require('./users-order-foods.constant');
const FoodsServices = require('../foods/foods.services');
const UserOrdersServices = require('../users_orders/users-orders.services');
const FoodBillsServices = require('../food-bills/food-bills.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { CreateUserOrderFoodValidationSchema } = require('./validations/create-users-order-food.schema');

const createUserOrderFood = async (req, res, next) => {
  logger.info(`${UsersOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_CONTROLLERS}::createUserOrderFood::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateUserOrderFoodValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { name, foods, paymentType, notes } = req.body;
    const staff = UserOrderFoodsServices.mapStaffData(req.staff);

    if(foods.length == 0)
    {
      logger.info(`${UsersOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_CONTROLLERS}::createUserOrderFood::foods is empty`);
      return res.status(HttpStatus.OK).json({
        message: UsersOrderFoodsConstant.MESSAGES.CREATE_USERS_ORDER_FOODS.CREATE_USERS_ORDER_FOODS_SUCCESS,
        info: {
          userOrder: {},
          usersOrderFoods: {
            usersOrderFoodsInfo: [],
            totalFoodsPrice: 0
          },
          bill: {},
          staff
        }
      });
    }

    const foodIds = foods.map(food => food.foodId);
    const foodsResult = await FoodsServices.findFoodsById(foodIds);

    if(foodsResult.length != foods.length)
    {
      logger.info(`${UsersOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_CONTROLLERS}::createUserOrderFood::food not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: UsersOrderFoodsConstant.MESSAGES.CREATE_USERS_ORDER_FOODS.FOOD_NOT_FOUND
      });
    }

    const userOrder = await UserOrdersServices.createUserOrder({staff: req.staff, name});
    await StaffActivitiesServices.createStaffActivities({
      staff: req.staff,
      name: StaffActivitiesConstant.NAME.USER_ORDER.CREATE,
      description: JSON.stringify(userOrder)
    });
    const usersOrderFoods = await UserOrderFoodsServices.createUserOrderFoods({foods, userOrder});
    await StaffActivitiesServices.createStaffActivities({
      staff: req.staff,
      name: StaffActivitiesConstant.NAME.USERS_ORDER_FOODS.CREATE,
      description: JSON.stringify(userOrder)
    })
    const mapFoodsAndUserOrderFoodsData = UserOrderFoodsServices.mapFoodsAndUsersOrderFoods({foods:foodsResult, usersOrderFoods});
    const foodBill = await FoodBillsServices.createFoodBills({
      amount: mapFoodsAndUserOrderFoodsData.totalFoodsPrice,
      userOrder,
      notes,
      paymentType
    });
    await StaffActivitiesServices.createStaffActivities({
      staff: req.staff,
      name: StaffActivitiesConstant.NAME.FOOD_BILLS.CREATE,
      description: JSON.stringify(userOrder)
    });
    const mapUserOrderData = UserOrderFoodsServices.mapUserOrderData(userOrder);

    logger.info(`${UsersOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_CONTROLLERS}::createUserOrderFood::success`);
    return res.status(HttpStatus.OK).json({
      message: UsersOrderFoodsConstant.MESSAGES.CREATE_USERS_ORDER_FOODS.CREATE_USERS_ORDER_FOODS_SUCCESS,
      info: {
        userOrder: mapUserOrderData,
        usersOrderFoods: mapFoodsAndUserOrderFoodsData,
        bill: foodBill,
        staff
      }
    });
  }catch(e){
    logger.error(`${UsersOrderFoodsConstant.LOGGER.USERS_ORDER_FOODS_CONTROLLERS}::createUserOrderFood::error`, e);
    return next(e)
  }
};

module.exports = {
  createUserOrderFood
};