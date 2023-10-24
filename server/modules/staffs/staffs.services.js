const log4js = require('log4js');
const logger = log4js.getLogger('Services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const StaffsConstant = require('../staffs/staffs.constant');
const ModelConstant = require('../../models/models.constant');
const PermissionsModel = require('../permissions/permissions.model');
const StaffsModel = require('./staffs.model');
const { JWTSecretKey } = require('../../utils/secrets');

const isValidHashPassword = ({hashPassword, password}) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::isValidHashPassword::Is called`);
  try{
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::isValidHashPassword::success`);
    return bcrypt.compareSync(password, hashPassword);
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::isValidHashPassword::Error`, e);
    throw new Error(e);
  }
};

const generateToken = (data) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::generateToken::Is called`);
  try{
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::generateToken::success`);
    return jwt.sign(data, JWTSecretKey, {
      expiresIn: (60 * 60) * StaffsConstant.TOKEN_EXPIRED_IN_HOUR
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::generateToken::Error`, e);
    throw new Error(e);
  }
};

const updatePassword = async ({req, password}) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::updatePassword::Is called`);
  try{
    const salt = bcrypt.genSaltSync(StaffsConstant.SALT_LENGTH);
    req.staff.password = bcrypt.hashSync(password, salt);
    
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::updatePassword::success`);
    return await req.staff.save();
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::updatePassword::Error`, e);
    throw new Error(e);
  }
};

const findStaffByUserName = async (userName) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::findStaffByUserName::Is called`);
  try{
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::findStaffByUserName::success`);
    return await StaffsModel.findOne({
      where: { userName },
      include: [{
        model: PermissionsModel,
        as: ModelConstant.STAFFS_THROUGH_PERMISSIONS,
        duplicating: false
      }]
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::findStaffByUserName::Error`, e);
    throw new Error(e);
  }
};

const findStaffById = async (staffId) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::findStaffById::Is called`);
  try{
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::findStaffById::success`);
    return await StaffsModel.findOne({
      where: { 
        id: staffId 
      },
      include: [{
        model: PermissionsModel,
        as: ModelConstant.STAFFS_THROUGH_PERMISSIONS,
        duplicating: false
      }]
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::findStaffById::Error`, e);
    throw new Error(e);
  }
};

const mapLoginResponse = (staff) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::mapLoginResponse::Is called`);
  try{
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::mapLoginResponse::success`);
    let staffJsonParse = JSON.parse(JSON.stringify(staff));
    delete staffJsonParse.id;
    delete staffJsonParse.createdAt;
    delete staffJsonParse.updatedAt;
    delete staffJsonParse.deletedAt;
    delete staffJsonParse.password;
    delete staffJsonParse.permissionId;
    delete staffJsonParse[ModelConstant.STAFFS_THROUGH_PERMISSIONS].id;
    delete staffJsonParse[ModelConstant.STAFFS_THROUGH_PERMISSIONS].createdAt;
    delete staffJsonParse[ModelConstant.STAFFS_THROUGH_PERMISSIONS].updatedAt;
    delete staffJsonParse[ModelConstant.STAFFS_THROUGH_PERMISSIONS].deletedAt;
    staffJsonParse['token'] = generateToken({id: staff.id});

    return staffJsonParse;
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::mapLoginResponse::Error`, e);
    throw new Error(e);
  }
};

const mapStaffData = (staff) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::mapStaffData::is called`);
  try{
    let staffJsonParse = JSON.parse(JSON.stringify(staff));

    delete staffJsonParse.deletedAt;
    delete staffJsonParse.createdAt;
    delete staffJsonParse.updatedAt;
    delete staffJsonParse.id;
    delete staffJsonParse.permissionId;
    delete staffJsonParse.password;

    return staffJsonParse;
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::mapStaffData::error`, e);
    throw new Error(e);
  }
};

const createStaff = async ({permission, fullName, userName, email, phoneNumber}) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::createStaff::is called`);
  try{
    const newStaff = new StaffsModel({
      permissionId: permission.id,
      fullName,
      userName,
      email,
      phoneNumber,
      password: bcrypt.hashSync(phoneNumber, bcrypt.genSaltSync(StaffsConstant.SALT_LENGTH))
    });
    
    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::createStaff::success`);
    return await newStaff.save();
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::createStaff::error`, e);
    throw new Error(e);
  }
};

const getStaffs = async (permission) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::getStaffs::is called`);
  try{
    let queryCondition = {
      code: {}
    }

    if(permission)
    {
      queryCondition['code'].code = permission;
    }

    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::getStaffs::success`);
    return await StaffsModel.findAll({
      order: [['id', 'DESC']],
      include: [{
        model: PermissionsModel,
        as: ModelConstant.STAFFS_THROUGH_PERMISSIONS,
        duplicating: false,
        where: queryCondition.code
      }]
    });
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::getStaffs::error`, e);
    throw new Error(e);
  }
};

const resetPassword = async (staff) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::resetPassword::is called`);
  try{
    staff.password = bcrypt.hashSync(staff.phoneNumber, bcrypt.genSaltSync(StaffsConstant.SALT_LENGTH));

    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::resetPassword::success`);
    return await staff.save();
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::resetPassword::error`, e);
    throw new Error(e);
  }
};

const updateStaff = async ({staff, permission, fullName, userName, email, phoneNumber}) => {
  logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::updateStaff::is called`);
  try{
    if(permission){
      staff.permissionId = permission.id;
    }

    if(fullName){
      staff.fullName = fullName;
    }

    if(userName){
      staff.userName = userName;
    }

    if(email){
      staff.email = email;
    }

    if(phoneNumber){
      staff.phoneNumber = phoneNumber;
    }

    logger.info(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::updateStaff::success`);
    return await staff.save();
  }catch(e){
    logger.error(`${StaffsConstant.LOGGER.STAFFS_SERVICES}::updateStaff::error`, e);
    throw new Error(e);
  }
}

module.exports = {
  isValidHashPassword,
  generateToken,
  updatePassword,
  findStaffById,
  findStaffByUserName,
  mapLoginResponse,
  mapStaffData,
  createStaff,
  getStaffs,
  resetPassword,
  updateStaff
}