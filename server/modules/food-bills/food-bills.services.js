const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const FoodBillsConstant = require('./food-bills.constant');
const FoodBillsModel = require('./food-bills.model');

const createFoodBills = async ({amount, userOrder, notes, paymentType}) => {
  logger.info(`${FoodBillsConstant.LOGGER.FOOD_BILLS_SERVICES}::createFoodBills::is called`);
  try{
    const newFoodBills = new FoodBillsModel({
      usersOrderId: userOrder.id,
      notes: notes || '',
      amount,
      paymentType,
      paymentDate: new Date()
    });

    logger.info(`${FoodBillsConstant.LOGGER.FOOD_BILLS_SERVICES}::createFoodBills::creating food bills`);
    return await newFoodBills.save();
  }catch(e){
    logger.error(`${FoodBillsConstant.LOGGER.FOOD_BILLS_SERVICES}::createFoodBills::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  createFoodBills
}