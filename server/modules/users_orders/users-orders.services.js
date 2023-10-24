const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const UserOrdersConstant = require('./users-orders.constant');
const UserOrdersModel = require('./users_orders.model');
const ModelConstant = require('../../models/models.constant');
const UsersOrdersFoodsModel = require('../users-order-foods/users-orders-foods.model');
const FoodBillsModel = require('../food-bills/food-bills.model');

const createUserOrder = async ({staff, name}) => {
  logger.info(`${UserOrdersConstant.LOGGER.USERS_ORDERS_SERVICES}::createUserOrder::is called`);
  try{
    const newUserOrder = new UserOrdersModel({
      staffId: staff.id,
      userFullName: name || ''
    })

    logger.info(`${UserOrdersConstant.LOGGER.USERS_ORDERS_SERVICES}::createUserOrder::success`);
    return await newUserOrder.save();
  }catch(e){
    logger.error(`${UserOrdersConstant.LOGGER.USERS_ORDERS_SERVICES}::createUserOrder::error`, e);
    throw new Error(e);
  }
};

const getUserOrderHasConditions = async ({startDate, endDate}) => {
  logger.info(`${UserOrdersConstant.LOGGER.USERS_ORDERS_SERVICES}::getUserOrderHasConditions::is called`);
  try{
    let conditions = {};

    if(startDate && endDate)
    {
      conditions['createdAt'] = { 
          [Op.gt]: startDate,
          [Op.lt]: endDate
      }
    }

    logger.info(`${UserOrdersConstant.LOGGER.USERS_ORDERS_SERVICES}::getUserOrderHasConditions::success.`);
    return await UserOrdersModel.findAll({
      order: [['id', 'DESC']],
      where: conditions,
      include: [
        {
          model: UsersOrdersFoodsModel,
          as: ModelConstant.USERS_ORDERS_THROUGH_USERS_ORDERS_FOODS,
          duplicating: false
        },
        {
          model: FoodBillsModel,
          as: ModelConstant.USERS_ORDERS_THROUGH_FOOD_BILLS,
          duplicating: false,
        }
      ]
    });
  }catch(e){
    logger.error(`${UserOrdersConstant.LOGGER.USERS_ORDERS_SERVICES}::getUserOrderHasConditions::error.`, e);
    throw new Error(e);
  }
};

module.exports = {
  createUserOrder,
  getUserOrderHasConditions
}