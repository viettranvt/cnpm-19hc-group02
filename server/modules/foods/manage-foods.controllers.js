const Joi = require('@hapi/joi');
const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require('http-status-codes');

const FoodsConstant = require('./foods.constant');
const FoodsServices = require('./foods.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { GetFoodsValidationSchema } = require('./validations/manage-get-foods.schema');
const { CreateFoodValidationSchema } = require('./validations/create-food.schema');
const { UpdateFoodValidationSchema } = require('./validations/update-food.schema');

const getFoods = async (req, res, next) => {
  logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::getFoods::is called`);
  try{
    const { error } = Joi.validate(req.query, GetFoodsValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { group } = req.query;
    const foods = await FoodsServices.getFoodsHasConditions(group);

    logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::getFoods::success`);
    return res.status(HttpStatus.OK).json({
      message: FoodsConstant.MESSAGES.MANAGE.GET_FOODS.GET_FOODS_SUCCESS,
      foods
    });
  }catch(e){
    logger.error(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::getFoods::error`, e);
    return next(e);
  }
};

const createFood = async (req, res, next) => {
  logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::createFood::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateFoodValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { group, name, price, description } = req.body;
    let food = await FoodsServices.findFoodByName(name);

    if(food)
    {
      logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::createFood::food name exists`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: FoodsConstant.MESSAGES.MANAGE.CREATE_FOOD.FOOD_NAME_EXISTS
      });
    }

    food = await FoodsServices.createFood({group, name, price, description});
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.FOODS.CREATE, description: JSON.stringify(food)});

    logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::createFood::success`);
    return res.status(HttpStatus.OK).json({
      message: FoodsConstant.MESSAGES.MANAGE.CREATE_FOOD.CREATE_FOOD_SUCCESS,
      food
    });
  }catch(e){
    logger.error(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::createFood::error`, e);
    return next(e);
  }
};

const updateFood = async (req, res, next) => {
  logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::updateFood::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdateFoodValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { group, name, price, description, foodId } = req.body;
    let food = await FoodsServices.findFoodById(foodId);

    if(!food)
    {
      logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::updateFood::food not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: FoodsConstant.MESSAGES.MANAGE.UPDATE_FOOD.FOOD_NOT_FOUND
      });
    }

    if(name)
    {
      const foodwhenFindByName = await FoodsServices.findFoodByName(name);
      if(foodwhenFindByName)
      {
        if(foodwhenFindByName.id != food.id)
        {
          logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::updateFood::food name exists`);
          return res.status(HttpStatus.NOT_FOUND).json({
            message: FoodsConstant.MESSAGES.MANAGE.UPDATE_FOOD.FOOD_NAME_EXISTS
          });
        }
      }
    }

    let foodJsonParse = { oldFood: food };
    food = await FoodsServices.updateFood({food, group, name, price, description});
    foodJsonParse['food'] = food;
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.FOODS.UPDATE, description: JSON.stringify(foodJsonParse)});

    logger.info(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::updateFood::success`);
    return res.status(HttpStatus.OK).json({
      message: FoodsConstant.MESSAGES.MANAGE.UPDATE_FOOD.UPDATE_FOOD_SUCCESS,
      food
    });
  }catch(e){
    logger.error(`${FoodsConstant.LOGGER.MANAGE_FOODS_CONTROLLERS}::updateFood::error`, e);
    return next(e);
  }
};

module.exports = {
  getFoods,
  createFood,
  updateFood
};
