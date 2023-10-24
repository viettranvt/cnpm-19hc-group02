const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const PermissionsConstant = require('./permissons.constant');
const PermissionServices = require('./permissions.services');

const getPermissions = async (req, res, next) => {
  logger.error(`${PermissionsConstant.LOGGER.MANAGE_PERMISSIONS_CONTROLLERS}::::is called`);
  try{
    const permissions = await PermissionServices.getPermissions();

    return res.status(HttpStatus.OK).json({
      message: PermissionsConstant.MESSAGES.GET_PERMISSIONS.GET_PERMISSIONS_SUCCESS,
      permissions
    })
  }catch(e){
    logger.error(`${PermissionsConstant.LOGGER.MANAGE_PERMISSIONS_CONTROLLERS}::error`, e);
    return next(e);
  }
};

module.exports = {
  getPermissions
}