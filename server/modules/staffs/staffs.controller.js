const Joi = require('@hapi/joi');
const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require('http-status-codes');

const StaffsConstant = require('./staffs.constant');
const StaffsServices = require('./staffs.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { LoginValidationSchema } = require('./validations/login.schema');
const { UpdatePasswordValidationSchema } = require('./validations/update-password.schema');

const login = async (req, res, next) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::login::is called`);
  try {
    const { error } = Joi.validate(req.body, LoginValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }    

    const { userName, password } = req.body;
    const staff = await StaffsServices.findStaffByUserName(userName);
  
    if (!staff) {
      logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::login::Staff not found.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: StaffsConstant.MESSAGES.LOGIN.USER_NAME_OR_PASSWORD_NOT_MATCHED
      });
    }

    if(!StaffsServices.isValidHashPassword({hashPassword: staff.password, password})){
      logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::login::password not matched`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: StaffsConstant.MESSAGES.LOGIN.USER_NAME_OR_PASSWORD_NOT_MATCHED
      });
    }

    logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::login::success`);
    return res.status(HttpStatus.OK).json({
      message: StaffsConstant.MESSAGES.LOGIN.LOGIN_SUCCESS,
      staff: StaffsServices.mapLoginResponse(staff)
    });
  } catch (e) {
    logger.error(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::login::error`, e);
    return next(e);
  }
};

const updatePassword = async (req, res, next) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::updatePassword::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdatePasswordValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const  { oldPassword, password, confirmedPassword } = req.body;

    if(!StaffsServices.isValidHashPassword({ hashPassword: req.staff.password, password: oldPassword})){
      logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::UpdatePassword::Old password not matched`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: StaffsConstant.MESSAGES.UPDATE_PASSWORD.OLD_PASSWORD_NOT_MATCHED
      });
    }

    if(password != confirmedPassword)
    {
      logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::UpdatePassword::password and confirmed password not matched`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: StaffsConstant.MESSAGES.UPDATE_PASSWORD.PASSWORD_AND_COMFIRMED_PASSWORD_NOT_MATCHED
      });
    }

    const staff = await StaffsServices.updatePassword({req, password});
    await StaffActivitiesServices.createStaffActivities({staff, name: StaffActivitiesConstant.NAME.STAFF.UPDATE_PASSWORD, description: JSON.stringify(staff)});
    
    logger.info(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::UpdatePassword::Success`);
    return res.status(HttpStatus.OK).json({
      message: StaffsConstant.MESSAGES.UPDATE_PASSWORD.UPDATE_PASSWORD_SUCCESS
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_CONTROLLERS}::updatePassword::error`, e);
    return next(e);
  }
}

module.exports = {
  login,
  updatePassword
};
