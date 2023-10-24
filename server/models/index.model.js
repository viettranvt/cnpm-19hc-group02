const BillsModel = require('../modules/bills/bills.model');
const BookingFoodsModel = require('../modules/booking-foods/booking-foods.model');
const BookingServicesModel = require('../modules/booking-services/booking-services.model');
const BookingsModel = require('../modules/bookings/bookings.model');
const FoodBillsModel = require('../modules/food-bills/food-bills.model');
const FoodsModel = require('../modules/foods/foods.model');
const PermissionsModel = require('../modules/permissions/permissions.model');
const RoomsModel = require('../modules/rooms/rooms.model');
const RoomTypesModel = require('../modules/room-types/room-types.model');
const ScheduleModel = require('../modules/schedule/schedule.model');
const ServicesModel = require('../modules/services/services.model');
const StaffActivitiesModel = require('../modules/staff-activities/staff-activities.model');
const StaffsModel = require('../modules/staffs/staffs.model');
const UsersModel = require('../modules/users/users.model');
const UsersOrdersFoodsModel =require('../modules/users-order-foods/users-orders-foods.model');
const UsersOrdersModel = require('../modules/users_orders/users_orders.model');
const OrderFoodsModel = require('../modules/order-foods/order-foods.model');
const ModelConstant = require('./models.constant');

PermissionsModel.hasMany(StaffsModel, { foreignKey: 'permissionId', as: ModelConstant.PERMISSIONS_THROUGH_STAFFS, targetKey: 'permissionId' });
StaffsModel.belongsTo(PermissionsModel, { foreignKey: 'permissionId', as: ModelConstant.STAFFS_THROUGH_PERMISSIONS });

StaffsModel.hasMany(BookingFoodsModel, { foreignKey: 'staffId', as: ModelConstant.STAFFS_THROUGH_BOOKINGS_FOOD, targetKey: 'staffId' });
BookingFoodsModel.belongsTo(StaffsModel, { foreignKey: 'staffId', as: ModelConstant.BOOKINGS_FOOD_THROUGH_STAFFS});

StaffsModel.hasMany(BookingsModel, { foreignKey: 'staffId', as: ModelConstant.STAFFS_THROUGH_BOOKINGS, targetKey: 'staffId' });
BookingsModel.belongsTo(StaffsModel, { foreignKey: 'staffId', as: ModelConstant.BOOKINGS_THROUGH_STAFFS });

StaffsModel.hasMany(StaffActivitiesModel, { foreignKey: 'staffId', as: ModelConstant.STAFFS_THROUGH_STAFF_ACTIVITIES, targetKey: 'staffId' });
StaffActivitiesModel.belongsTo(StaffsModel, { foreignKey: 'staffId', as: ModelConstant.STAFF_ACTIVITIES_THROUGH_STAFFS });

StaffsModel.hasMany(BookingServicesModel, { foreignKey: 'staffId', as: ModelConstant.STAFFS_THROUGH_BOOKING_SERVICES, targetKey: 'staffId' });
BookingServicesModel.belongsTo(StaffsModel, { foreignKey: 'staffId', as: ModelConstant.BOOKING_SERVICES_THROUGH_STAFFS });

StaffsModel.hasMany(ScheduleModel, { foreignKey: 'staffId', as: ModelConstant.STAFFS_THROUGH_SCHEDULE, targetKey: 'staffId' });
ScheduleModel.belongsTo(StaffsModel, { foreignKey: 'staffId', as: ModelConstant.SCHEDULE_THROUGH_STAFFS });

StaffsModel.hasMany(UsersOrdersModel, { foreignKey: 'staffId', as: ModelConstant.STAFFS_THROUGH_USERS_ORDERS, targetKey: 'staffId' });
UsersOrdersModel.belongsTo(StaffsModel, { foreignKey: 'staffId', as: ModelConstant.USERS_ORDERS_THROUGH_STAFFS });

StaffsModel.hasMany(ScheduleModel, { foreignKey: 'staffId', as: ModelConstant.CREATOR_THROUGH_SCHEDULE, targetKey: 'creatorId' });
ScheduleModel.belongsTo(StaffsModel, { foreignKey: 'creatorId', as: ModelConstant.SCHEDULE_THROUGH_CREATOR});

UsersOrdersModel.hasMany(UsersOrdersFoodsModel, { foreignKey: 'usersOderId', as: ModelConstant.USERS_ORDERS_THROUGH_USERS_ORDERS_FOODS, targetKey: 'usersOderId' });
UsersOrdersFoodsModel.belongsTo(UsersOrdersModel, { foreignKey: 'usersOderId', as: ModelConstant.USERS_ORDERS_FOODS_THROUGH_USERS_ORDERS });

UsersOrdersModel.hasOne(FoodBillsModel, { foreignKey: 'usersOrderId', as: ModelConstant.USERS_ORDERS_THROUGH_FOOD_BILLS });
FoodBillsModel.belongsTo(UsersOrdersModel, { foreignKey: 'usersOrderId', as: ModelConstant.FOOD_BILLS_THROUGH_USERS_ORDERS });

ServicesModel.hasMany(BookingServicesModel, { foreignKey: 'serviceId', as: ModelConstant.SERVICES_THROUGH_BOOKINGS_SERVICES, targetKey: 'serviceId' });
BookingServicesModel.belongsTo(ServicesModel, { foreignKey: 'serviceId', as: ModelConstant.BOOKINGS_SERVICES_THROUGH_SERVICES });

FoodsModel.hasMany(UsersOrdersFoodsModel, { foreignKey: 'foodId', as: ModelConstant.FOODS_THROUGH_USERS_ORDERS_FOODS, targetKey: 'foodId' });
UsersOrdersFoodsModel.belongsTo(FoodsModel, { foreignKey: 'foodId', as: ModelConstant.USERS_ORDERS_FOODS_THROUGH_FOODS });

FoodsModel.hasMany(OrderFoodsModel, { foreignKey: 'foodId', as: ModelConstant.FOODS_THROUGH_ORDER_FOODS, targetKey: 'foodId' });
OrderFoodsModel.belongsTo(FoodsModel, { foreignKey: 'foodId', as: ModelConstant.ORDER_FOODS_THROUGH_FOODS });

BookingFoodsModel.hasMany(OrderFoodsModel, { foreignKey: 'bookingFoodsId', as: ModelConstant.BOOKING_FOODS_THROUGH_ORDER_FOODS, targetKey: 'bookingFoodsId' });
OrderFoodsModel.belongsTo(BookingFoodsModel, { foreignKey: 'bookingFoodsId', as: ModelConstant.ORDER_FOODS_THROUGH_BOOKING_FOODS });

BookingsModel.hasMany(BookingFoodsModel, { foreignKey: 'bookingId', as: ModelConstant.BOOKINGS_THROUGH_BOOKING_FOODS, targetKey: 'bookingId' });
BookingFoodsModel.belongsTo(BookingsModel, { foreignKey: 'bookingId', as: ModelConstant.BOOKING_FOODS_THROUGH_BOOKINGS });

BookingsModel.hasMany(BookingServicesModel, { foreignKey: 'bookingId', as: ModelConstant.BOOKINGS_THROUGH_BOOKING_SERVICES, targetKey: 'bookingId' });
BookingServicesModel.belongsTo(BookingsModel, { foreignKey: 'bookingId', as: ModelConstant.BOOKING_SERVICES_THROUGH_BOOKINGS });

BookingsModel.hasOne(BillsModel, { foreignKey: 'bookingId', as: ModelConstant.BOOKINGS_THROUGH_BILLS});
BillsModel.belongsTo(BookingsModel, { foreignKey: 'bookingId', as: ModelConstant.BILLS_THROUGH_BOOKINGSb });

UsersModel.hasMany(BookingsModel, { foreignKey: 'userId', as: ModelConstant.USERS_THROUGH_BOOKINGS, targetKey: 'userId' });
BookingsModel.belongsTo(UsersModel, { foreignKey: 'userId', as: ModelConstant.BOOKINGS_THROUGH_USERS });

RoomsModel.hasMany(BookingsModel, { foreignKey: 'roomId', as: ModelConstant.ROOMS_THROUGH_BOOKINGS, targetKey: 'roomId' });
BookingsModel.belongsTo(RoomsModel, { foreignKey: 'roomId', as: ModelConstant.BOOKINGS_THROUGH_ROOMS });

RoomTypesModel.hasMany(RoomsModel, { foreignKey: 'typeId', as: ModelConstant.ROOM_TYPES_THROUGH_ROOMS, targetKey: 'typeId' });
RoomsModel.belongsTo(RoomTypesModel, { foreignKey: 'typeId', as: ModelConstant.ROOMS_THROUGH_ROOM_TYPES });
