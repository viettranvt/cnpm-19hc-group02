const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const UsersModel = require('./users.model');
const UsersServices = require('./users.service');
const UsersConstant = require('./users.constant');
const PaginationConstant = require('../../constants/pagination.constant');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { CreateUserValidationSchema } = require('./validations/create-user.schema');
const { DeleteUserValidationSchema } = require('./validations/delete-user.schema');
const { UpdateUserValidationSchema } = require('./validations/update-user.schema');
const { GetListUsersValidationSchema } = require('./validations/get-list-users.schema');

const createdUser = async (req, res, next) => {
  logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::createdUser::Is called`);
  try{
    const { error } = Joi.validate(req.body, CreateUserValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { fullName, address, phoneNumber, identityId } = req.body;

    if(!Number(identityId) || identityId.length != 9 && identityId.length != 12){
      logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::createdUser::identity id is not valid`);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: UsersConstant.MESSAGES.CREATE_USER.IDENTITY_ID_IS_NOT_VALID});
    }

    const user = await UsersServices.findUserByIdentityId(identityId);

    if(user){
      logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::createdUser::identity id exists`);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: UsersConstant.MESSAGES.CREATE_USER.IDENTITY_ID_EXISTS});
    }

    const newUser = await UsersServices.createUser({ fullName, address, phoneNumber, identityId });
    let newUserJsonParse = JSON.parse(JSON.stringify(newUser));
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.USER.CREATE, description: JSON.stringify(newUser)});
    
    logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::createdUser::success`);
    return res.status(HttpStatus.OK).json({
       message: UsersConstant.MESSAGES.CREATE_USER.CREATE_USER_SUCCESS,
       user: {
         ...newUserJsonParse
       }
    });
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::createdUser::error`, e);
    return next(e);
  }
};

const deleteUser = async (req, res, next) => {
  logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::deleteUser::is called`);
  try{
    const { error } = Joi.validate(req.body, DeleteUserValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { userId } = req.body;
    let user = await UsersModel.findOne({ where: { id: userId } });

    if(!user)
    {
      logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::deleteUser::user not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: UsersConstant.MESSAGES.DELETE_USER.USER_NOT_FOUND
     });
    }

    const userStringify = JSON.stringify(user);
    await UsersServices.deleteUser(user);
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.USER.DELETE, description: userStringify});

    logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::deleteUser::success`);
    return res.status(HttpStatus.OK).json({
      message: UsersConstant.MESSAGES.DELETE_USER.DELETE_USER_SUCCESS
   });
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::deleteUser::error`, e);
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::updateUser::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdateUserValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { userId, fullName, address, phoneNumber } = req.body;
    let user = await UsersModel.findOne( { where: { id: userId } } );

    if(!user)
    {
      logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::updateUser::User not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: UsersConstant.MESSAGES.UPDATE_USER.USER_NOT_FOUND
     });
    }

    const userResponse = await UsersServices.updateUser({ user, fullName, address, phoneNumber });
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.USER.UPDATE, description: JSON.stringify(userResponse.user)});

    return res.status(userResponse.status).json({
      message: userResponse.message,
      user: userResponse.user
   });

  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::updateUser::error`, e);
    return next(e);
  }
};

const getListUsers = async (req, res, next) => {
  logger.info(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::getListUsers::is called`);
  try{
    const { error } = Joi.validate(req.query, GetListUsersValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { name } = req.query;
    const users = await UsersServices.getListUsers(name);

    return res.status(HttpStatus.OK).json({
      message: UsersConstant.MESSAGES.GET_LIST_USERS.GET_LIST_USERS_SUCCESS,
      users
    });
  }catch(e){
    logger.error(`${UsersConstant.LOGGER.USERS_CONTROLLERS}::getListUsers::error`, e);
    return next(e);
  }
};

module.exports = {
  createdUser,
  deleteUser,
  updateUser,
  getListUsers
};

