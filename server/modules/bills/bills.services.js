const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const BookingFoodsServices = require('../booking-foods/booking-foods.services');
const BillsConstant = require('./bills.constant');
const BillsModel = require('./bills.model');
const BookingServices = require('../bookings/bookings.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');
const ModelContant = require('../../models/models.constant');

const createBills = async ({booking, paymentType, notes, paymentDate, isPayment}) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::createBills::is called.`);
  try{
    const charges = chargedWhenGuestsCheckOut(booking);
    
    const newBills = new BillsModel({
      bookingId: booking.id,
      paymentType,
      notes: notes || null,
      paymentDate,
      isPayment,
      amount: charges.totalOrderFoodsPrice + charges.totalRoomPrice + charges.totalServicesPrice
    })

    logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::createBills::success.`);
    return await newBills.save();
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::createBills::error.`, e);
    throw new Error(e);
  }
};

const chargedWhenGuestsCheckOut = (booking) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::chargedWhenGuestsCheckOut::is called.`);
  try{
    const bookingServices = booking[ModelContant.BOOKINGS_THROUGH_BOOKING_SERVICES];
    const bookingFoods = booking[ModelContant.BOOKINGS_THROUGH_BOOKING_FOODS];
    let totalServicesPrice = 0;
    let totalOrderFoodsPrice = 0;
    let totalRoomPrice = booking.price;

    if(bookingServices.length > 0)
    {
      totalServicesPrice = bookingServices.reduce((price, bookingService) => {
        return price += bookingService.number * bookingService[ModelContant.BOOKINGS_SERVICES_THROUGH_SERVICES].price;
      }, 0)
    }

    if(bookingFoods.length > 0)
    {
      totalOrderFoodsPrice = bookingFoods.reduce((price, bookingFood) => {
        const orderFoods = bookingFood[ModelContant.BOOKING_FOODS_THROUGH_ORDER_FOODS];
        let totalPrice = 0

        if(orderFoods.length > 0)
        {
          totalPrice = orderFoods.reduce((foodsPrice, orderFood) => {
            return foodsPrice += orderFood.number * orderFood[ModelContant.ORDER_FOODS_THROUGH_FOODS].price;
          }, 0);
        }
        
        return price += totalPrice;
      }, 0)
    }

    logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::chargedWhenGuestsCheckOut::success.`);
    return { totalRoomPrice, totalOrderFoodsPrice, totalServicesPrice };
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::chargedWhenGuestsCheckOut::error.`, e);
    throw new Error(e);
  }
};

const mapReponseData = booking => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapReponseData::is called.`);
  try{
    const bookingJsonParse = JSON.parse(JSON.stringify(booking));
    const bookingFoods = mapBookingFoodsData(bookingJsonParse);
    const bill = bookingJsonParse[ModelContant.BOOKINGS_THROUGH_BILLS];
    const services = mapServicesData(bookingJsonParse);
    const user = mapUserData(bookingJsonParse);
    const room = mapRoomData(bookingJsonParse);
    const bookingInfo = mapBookingData(bookingJsonParse);

    const mapData = {
      bookingInfo,
      bill,
      user,
      room,
      services,
      bookingFoods
    };

    return mapData;
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapReponseData::error.`, e);
    throw new Error(e);
  }
};

const mapUserData = (booking) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapDataUser::is called.`);
  try{
    let user = booking[ModelContant.BOOKINGS_THROUGH_USERS];
    delete user.createdAt;
    delete user.updatedAt;
    delete user.id;
    delete user.deletedAt;

    return user;
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapDataUser::error.`, e);
    throw new Error(e);
  }
};

const mapRoomData = (booking) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapRoomData::is called.`);
  try{
    let room = booking[ModelContant.BOOKINGS_THROUGH_ROOMS];
    let type = room[ModelContant.ROOMS_THROUGH_ROOM_TYPES];
    delete room.createdAt;
    delete room.updatedAt;
    delete room.id;
    delete room.deletedAt;
    delete room.typeId;
    delete room[ModelContant.ROOMS_THROUGH_ROOM_TYPES];

    delete type.createdAt;
    delete type.updatedAt;
    delete type.id;
    delete type.deletedAt;
    delete type.code;

    room = {...room, ...type};

    return room;
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapRoomData::error.`, e);
    throw new Error(e);
  }
};

const mapServicesData = (booking) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapServiceData::is called.`);
  try{
    let bookingServices = booking[ModelContant.BOOKINGS_THROUGH_BOOKING_SERVICES];
    let services = {
      servicesInfo: [],
      totalServicesPrice: 0
    };

    if(bookingServices.length > 0)
    {
      services['servicesInfo'] = bookingServices.map(bookingService => {
        let service = bookingService[ModelContant.BOOKINGS_SERVICES_THROUGH_SERVICES];
        delete bookingService.createdAt;
        delete bookingService.updatedAt;
        delete bookingService.deletedAt;
        delete bookingService[ModelContant.BOOKINGS_SERVICES_THROUGH_SERVICES];

        // delete service.createdAt;
        delete service.updatedAt;
        delete service.deletedAt;

        const totalServicePrice = bookingService.number * service.price;

        return {...bookingService, ...service, totalServicePrice};
      });

      const amount = services['servicesInfo'].reduce((price, service) => {
        return price += service.totalServicePrice;
      }, 0);
      services.totalServicesPrice = amount;
    }

    return services;
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapServicesData::error.`, e);
    throw new Error(e);
  }
};

const mapBookingFoodsData = (booking) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapFoodsData::is called.`);
  try{
    let bookingFoods = booking[ModelContant.BOOKINGS_THROUGH_BOOKING_FOODS].filter(bookingFood => bookingFood.isConfirmed);
    const foods = {
      bookingFoodsInfo: [],
      totalBookingFoodsPrice: 0
    };

    if(bookingFoods.length > 0)
    {
      foods['bookingFoodsInfo'] = bookingFoods.map(bookingFood => {
        let orderFoods = bookingFood[ModelContant.BOOKING_FOODS_THROUGH_ORDER_FOODS];
        delete bookingFood.bookingId,
        delete bookingFood.updatedAt;
        delete bookingFood.deletedAt;
        delete bookingFood[ModelContant.BOOKING_FOODS_THROUGH_ORDER_FOODS];
        let foodInfo = orderFoods.map(orderFood => {
          let food = orderFood[ModelContant.ORDER_FOODS_THROUGH_FOODS];
          delete orderFood.id;
          delete orderFood.foodId;
          delete orderFood.createdAt;
          delete orderFood.updatedAt;
          delete orderFood.deletedAt;
          delete orderFood.bookingFoodsId;
          delete orderFood[ModelContant.ORDER_FOODS_THROUGH_FOODS];
          
          delete food.id;
          delete food.createdAt;
          delete food.updatedAt;
          delete food.deletedAt;
          food['number'] = orderFood.number;

          const totalFoodPrice = orderFood.number * food.price;

          return {...orderFood, food, totalFoodPrice};
        });

        const totalFoodsPrice = foodInfo.reduce((price, food) => {
          return price += food.totalFoodPrice;
        }, 0);

        return {...bookingFood, foods: foodInfo, totalFoodsPrice};
      });

      foods.totalBookingFoodsPrice = foods['bookingFoodsInfo'].reduce((price, bookingFood) => {
        return price += bookingFood.totalFoodsPrice;
      }, 0);
    }

    return foods;
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapFoodsData::error.`, e);
    throw new Error(e);
  }
};

const updatePaymentForBill = async({billId, notes, paymentType, paymentDate, isPayment}) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::updatePaymentForBill::is called.`);
  try{
    logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::updatePaymentForBill::success.`);
    return await BillsModel.update({
      notes,
      paymentType,
      paymentDate,
      isPayment
    },{
      where: {
        id: billId
      }
    });
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::updatePaymentForBill::error.`, e);
    throw new Error(e);
  }
};

const mapBookingData = (booking) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapBookingData::is called.`);
  try{
    delete booking[ModelContant.BOOKINGS_THROUGH_BILLS];
    delete booking[ModelContant.BOOKINGS_THROUGH_BOOKING_FOODS];
    delete booking[ModelContant.BOOKINGS_THROUGH_BOOKING_SERVICES];
    delete booking[ModelContant.BOOKINGS_THROUGH_ROOMS];
    delete booking[ModelContant.BOOKINGS_THROUGH_USERS];
    delete booking.staffId;
    delete booking.userId;
    delete booking.deletedAt;
    delete booking.updatedAt;
    delete booking.roomId;

    logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapBookingData::success.`);
    return booking;
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::mapBookingData::error.`, e);
    throw new Error(e);
  }
};

const updatePriceForBill = async ({billId, amount}) => {
  logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::updatePriceForBill::is called.`);
  try{
    logger.info(`${BillsConstant.LOGGER.BILLS_SERVICES}::updatePriceForBill::success.`);
    return await BillsModel.update({
      amount
    },{
      where: {
        id: billId
      }
    });
  }catch(e){
    logger.error(`${BillsConstant.LOGGER.BILLS_SERVICES}::updatePriceForBill::error.`, e);
    throw new Error(e);
  }
};

module.exports = {
  createBills,
  mapReponseData,
  updatePaymentForBill,
  updatePriceForBill
};