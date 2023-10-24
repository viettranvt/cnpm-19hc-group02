const Joi = require('@hapi/joi');
const StaffActivitiesConstant = require('../staff-activities.constant');

const ManageGetStaffActivitiesValidationSchema = Joi.object().keys({
  staffId: Joi.number().min(1),  
  name: Joi.valid([
      StaffActivitiesConstant.NAME.MANAGE.STAFFS.CREATE,
      StaffActivitiesConstant.NAME.MANAGE.STAFFS.UPDATE,
      StaffActivitiesConstant.NAME.MANAGE.SERVICES.CREATE,
      StaffActivitiesConstant.NAME.MANAGE.SERVICES.UPDATE,
      StaffActivitiesConstant.NAME.MANAGE.ROOM_TYPES.CREATE,
      StaffActivitiesConstant.NAME.MANAGE.ROOM_TYPES.UPDATE_PRICE,
      StaffActivitiesConstant.NAME.MANAGE.ROOM.CREATE,
      StaffActivitiesConstant.NAME.MANAGE.ROOM.UPDATE,
      StaffActivitiesConstant.NAME.MANAGE.FOODS.CREATE,
      StaffActivitiesConstant.NAME.MANAGE.FOODS.UPDATE,
      StaffActivitiesConstant.NAME.ORDER_FOODS.CREATE,
      StaffActivitiesConstant.NAME.SCHEDULE.CREATE_SCHEDULE,
      StaffActivitiesConstant.NAME.STAFF.UPDATE_PASSWORD,
      StaffActivitiesConstant.NAME.BOOKING_SERVICES.CREATE,
      StaffActivitiesConstant.NAME.USER.CREATE,
      StaffActivitiesConstant.NAME.USER.UPDATE,
      StaffActivitiesConstant.NAME.USER.DELETE,
      StaffActivitiesConstant.NAME.USERS_ORDER_FOODS.CREATE,
      StaffActivitiesConstant.NAME.USER_ORDER.CREATE,
      StaffActivitiesConstant.NAME.BILLS.CREATE,
      StaffActivitiesConstant.NAME.BOOKING.CREATE,
      StaffActivitiesConstant.NAME.BOOKING_FOODS.CREATE,
      StaffActivitiesConstant.NAME.FOOD_BILLS.CREATE
    ]),
    limit: Joi.number().min(1),
    page: Joi.number().min(1)
});

module.exports = {
  ManageGetStaffActivitiesValidationSchema
};