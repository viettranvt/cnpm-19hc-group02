const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const StaffsConstant = require('./staffs.constant');
const StaffsServices = require('./staffs.services');
const PermissionServices = require('../permissions/permissions.services');
const ModelsConstant = require('../../models/models.constant');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { CreateStaffValidationSchema } = require('./validations/create-staff.schema');
const { GetStaffsValidationSchema } = require('./validations/get-staffs.schema');
const { ResetPasswordValidationSchema } = require('./validations/reset-password.schema');
const { ManageUpdateStaffValidationSchema } = require('./validations/manage-update-staff.schema');

const createStaff = async (req, res, next) => {
  logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::createStaff::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateStaffValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { permission, fullName, userName, email, phoneNumber } = req.body;

    permission = await PermissionServices.findPermissionByCode(permission);

    if(!permission){
      logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::createStaff::permisson not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: StaffsConstant.MESSAGES.CREATE_STAFF.PERMISSION_NOT_FOUND
      });
    }

    let staff = await StaffsServices.findStaffByUserName(userName);

    if(staff)
    {
      logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::createStaff::userName has been taken`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: StaffsConstant.MESSAGES.CREATE_STAFF.USER_NAME_HAS_BEEN_TAKEN
      });
    }

    staff = await StaffsServices.createStaff({permission, fullName, userName, email, phoneNumber});

    let staffJsonParse = JSON.parse(JSON.stringify(staff));
    staffJsonParse[ModelsConstant.STAFFS_THROUGH_PERMISSIONS] = permission;
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.STAFFS.CREATE, description: JSON.stringify(staffJsonParse)});

    return res.status(HttpStatus.OK).json({
      message: StaffsConstant.MESSAGES.CREATE_STAFF.CREATE_STAFF_SUCCESS,
      staff: staffJsonParse
    });

  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::createStaff::error`, e);
    return next(e);
  }
};

const getStaffs = async (req, res, next) => {
  logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::getStaffs::is called`);
  try{
    const { error } = Joi.validate(req.query, GetStaffsValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { permission } = req.query;

    const staffs = await StaffsServices.getStaffs(permission);

    return res.status(HttpStatus.OK).json({
      message: StaffsConstant.MESSAGES.GET_STAFFS.GET_STAFFS_SUCCESS,
      staffs
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::getStaffs::error`, e);
    return next(e);
  }
};

const resetPassword = async (req, res, next) => {
  logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::resetPassword::is called`);
  try{
    const { error } = Joi.validate(req.body, ResetPasswordValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { staffId } = req.body;
    let staff = await StaffsServices.findStaffById(staffId);

    if(!staff)
    {
      logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::resetPassword::staff not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: StaffsConstant.MESSAGES.RESET_PASSWORD.STAFF_NOT_FOUND
      });
    }

    staff = await StaffsServices.resetPassword(staff);

    logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::resetPassword::success`);
    return res.status(HttpStatus.NOT_FOUND).json({
      message: StaffsConstant.MESSAGES.RESET_PASSWORD.RESET_PASSWORD_SUCCESS
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::resetPassword::error`, e);
    return next(e);
  }
};

const updateStaff = async (req, res, next) => {
  logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::updateStaff::is called`);
  try{
    const { error } = Joi.validate(req.body, ManageUpdateStaffValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { staffId, permission, fullName, userName, email, phoneNumber } = req.body;
    let staff = await StaffsServices.findStaffById(staffId);

    if(!staff){
      logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::updateStaff::staff not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: StaffsConstant.MESSAGES.UPDATE_STAFF.STAFF_NOT_FOUND
      });
    }

    if(permission)
    {
      permission = await PermissionServices.findPermissionByCode(permission);

      if(!permission){
        logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::updateStaff::permission not found`);
        return res.status(HttpStatus.NOT_FOUND).json({
          message: StaffsConstant.MESSAGES.UPDATE_STAFF.PERMISSIONS_NOT_FOUND
        });
      }
    }
   
    let staffInfo = { oldStaff: staff };
    staff = await StaffsServices.updateStaff({staff, permission, fullName, userName, email, phoneNumber});
    staff = JSON.parse(JSON.stringify(staff));
    staff[ModelsConstant.STAFFS_THROUGH_PERMISSIONS] = permission;
    staffInfo['staff'] = staff;
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.STAFFS.UPDATE, description: JSON.stringify(staffInfo)});

    logger.info(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::updateStaff::success`);
    return res.status(HttpStatus.OK).json({
      message: StaffsConstant.MESSAGES.UPDATE_STAFF.UPDATE_STAFF_SUCCESS,
      staff
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.MANAGE_STAFFS_CONTROLLERS}::updateStaff::error`, e);
    return next(e);
  }
}

module.exports = {
  createStaff,
  getStaffs,
  resetPassword,
  updateStaff
}

