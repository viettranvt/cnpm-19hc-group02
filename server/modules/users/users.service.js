const log4js = require('log4js');
const logger = log4js.getLogger('Sevices');
const HttpStatus = require('http-status-codes');
const Sequelize = require('sequelize');

const UsersModel = require('./users.model');
const BookingsModel = require('../bookings/bookings.model');
const BillsModel = require('../bills/bills.model');
const BookingFoodsModel = require('../booking-foods/booking-foods.model');
const BookingServicesModel = require('../booking-services/booking-services.model');
const OrderFoodsModel = require('../order-foods/order-foods.model');
const UsersConstant = require('./users.constant');
const RoomServices = require('../rooms/rooms.services');

const createUser = async ({ fullName, address, phoneNumber, identityId}) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::createUser::is called`);
  try{
    const newUser = new UsersModel({
      fullName,
      address,
      phoneNumber,
      identityType: identityId.length == 9 ? UsersConstant.IDENTITY_TYPE.NICE_NUMBERS : UsersConstant.IDENTITY_TYPE.TWELVE_NUMBERS,
      identityId
    });

    logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::createUser::success`);
    return await newUser.save();
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::createUser::error`, e);
    throw new Error(e);
  }
};

const updateUser = async ( { user,  fullName, address, phoneNumber } ) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::updateUser::is called`);
  try{
    if(fullName)
    {
      user.fullName = fullName;
    }

    if(address)
    {
      user.address = address;
    }

    if(phoneNumber)
    {
      user.phoneNumber = phoneNumber;
    }

    await user.save();

    logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::updateUser::success`);
    return { status: HttpStatus.OK, message: UsersConstant.MESSAGES.UPDATE_USER.UPDATE_USER_SUCCESS, user };
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::updateUser::error`, e);
    throw new Error(e);
  }
};

const getListUsers = async (name) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::getListUsers::is called`);
  try{
    let queryConditions = {};

    if(name){
      queryConditions = {
        fullName: {
          [Sequelize.Op.like]: '%' + name + '%'
        }
      };
    }

    const users = await UsersModel.findAll({
      where: queryConditions,
      order: [['id', 'DESC']]
    });

    logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::getListUsers::success`);
    return users;
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::getListUsers::error`, e);
    throw new Error(e);
  }
};

const deleteUser = async (user) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::deleteUser::is called`);
  try{
    const userId= user.id;

    const bookings = await BookingsModel.findAll({ where: { userId } });

    if(bookings.length > 0)
    {
      const bookingsId = bookings.map(booking => booking.id);
      const bills = await BillsModel.findAll({ where: { bookingId: { [Sequelize.Op.in]: bookingsId } } });
      const bookingFoods = await BookingFoodsModel.findAll({ where: { bookingId: { [Sequelize.Op.in]: bookingsId } } });
      const bookingServices = await BookingServicesModel.findAll({ where: { bookingId: { [Sequelize.Op.in]: bookingsId } } });
      const roomIds = bookings.map(booking => booking.roomId);
      await deleteUserRelatedTables({bills, bookingFoods, bookingServices});
      await RoomServices.updateIsBookedStatusByids(roomIds);
      await BookingsModel.destroy({ where: { id: {[Sequelize.Op.in]: bookingsId} } });
    }

    await user.destroy();
    return;
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::deleteUser::error`, e);
    console
    throw new Error(e);
  }
};

const deleteUserRelatedTables = async ({bills, bookingFoods, bookingServices}) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::deleteUserRelatedTables::is called`);
  try{
    if(bills.length > 0)
    {
      const billsIds = bills.map(bill => bill.id);
      await BillsModel.destroy({ where: { id: {[Sequelize.Op.in]: billsIds} } });
    }

    if(bookingServices.length > 0)
    {
      const bookingServicesIds = bookingServices.map(bookingService => bookingService.id);
      await BookingServicesModel.destroy({ where: { id: {[Sequelize.Op.in]: bookingServicesIds} } });
    }

    if(bookingFoods.length > 0)
    {
      const bookingFoodsIds = bookingFoods.map(bookingFood => bookingFood.id);
      const orderFoods = await OrderFoodsModel.findAll({ where: { bookingFoodsId: { [Sequelize.Op.in]: bookingFoodsIds } } });

      if(orderFoods.length > 0)
      {
        const orderFoodsIds = orderFoods.map(orderFood => orderFood.id);
        await OrderFoodsModel.destroy({ where: { id: {[Sequelize.Op.in]: orderFoodsIds} } });
      }

      await BookingFoodsModel.destroy({ where: { id: {[Sequelize.Op.in]: bookingFoodsIds} } });
    }
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::deleteUserRelatedTables::error`, e);
    throw new Error(e);
  }
};

const findUserById = async(userId) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::findUserById::is called`);
  try{
    return await UsersModel.findOne({ where: { id: userId } });
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::findUserById::error`, e);
    throw new Error(e);
  }
};

const findUserByIdentityId = async(identityId) => {
  logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::findUserByIdentityId::is called`);
  try{
    logger.info(`${UsersConstant.LOGGER.USERS_SERVICES}::findUserByIdentityId::is called`);
    return await UsersModel.findOne({ where: { identityId } });
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_SERVICES}::findUserByIdentityId::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  createUser,
  updateUser,
  getListUsers,
  deleteUser,
  findUserById,
  findUserByIdentityId
};


