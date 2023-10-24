const log4js = require('log4js');
const logger = log4js.getLogger('Services');
const Sequelize = require('sequelize');

const Constant = require('./foods.constant');
const Foods = require('./foods.model');

const getFoods = async () => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::getFoods::Is called`);
  try {
    let foods = await Foods.findAll();
    logger.info(`${Constant.LOGGER.FOODS_SERVICES}::getFoods::success`);
    return foods;
  } catch (e) {
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::getFoods::Error`, e);
    throw new Error(e);
  }
};

const findFoodsById = async(foodIds) => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::findFoodsById::Is called`);
  try{
    return await Foods.findAll({
      where: { 
        id: { 
          [Sequelize.Op.in]: foodIds 
        } 
      }
    });
  }catch(e){
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::findFoodsById::Error`, e);
    throw new Error(e);
  }
};

const getFoodsHasConditions = async (group) => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::getFoodsHasConditions::Is called`);
  try {
    let queryConditions = {};

    if(group)
    {
      queryConditions['group'] = group;
    }

    let foods = await Foods.findAll({
      where: queryConditions
    });

    logger.info(`${Constant.LOGGER.FOODS_SERVICES}::getFoodsHasConditions::success`);
    return foods;
  } catch (e) {
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::getFoodsHasConditions::Error`, e);
    throw new Error(e);
  }
};

const findFoodByName = async (name) => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::findFoodByName::Is called`);
  try {
    logger.info(`${Constant.LOGGER.FOODS_SERVICES}::findFoodByName::success`);
    return await Foods.findOne({
      where: { name }
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::findFoodByName::Error`, e);
    throw new Error(e);
  }
};

const createFood = async ({group, name, price, description}) => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::createFood::Is called`);
  try {
    const newFood = new Foods({
      group, 
      name,
      price,
      description
    });
    logger.info(`${Constant.LOGGER.FOODS_SERVICES}::createFood::success`);
    return await newFood.save();
  } catch (e) {
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::createFood::Error`, e);
    throw new Error(e);
  }
};

const findFoodById = async (foodId) => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::findFoodById::Is called`);
  try{
    logger.info(`${Constant.LOGGER.FOODS_SERVICES}::findFoodById::success`);
    return await Foods.findOne({
      where: { id: foodId }
    });
  }catch(e){
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::findFoodById::Error`, e);
    throw new Error(e);
  }
};

const updateFood = async ({food, group, name, price, description}) => {
  logger.info(`${Constant.LOGGER.FOODS_SERVICES}::updateFood::Is called`);
  try {
    if(group)
    {
      food.group = group;
    }

    if(name)
    {
      food.name = name;
    }

    if(price)
    {
      food.price = price;
    }

    if(description)
    {
      food.description = description;
    }

    logger.info(`${Constant.LOGGER.FOODS_SERVICES}::updateFood::success`);
    return await food.save();
  } catch (e) {
    logger.error(`${Constant.LOGGER.FOODS_SERVICES}::updateFood::Error`, e);
    throw new Error(e);
  }
};

module.exports = {
  getFoods,
  findFoodsById,
  getFoodsHasConditions,
  findFoodByName,
  createFood,
  findFoodById,
  updateFood
};