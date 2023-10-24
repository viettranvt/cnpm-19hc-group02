const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');

const PermissionsConstant = require('./permissons.constant');
const PermissionsModel = require('./permissions.model');

const findPermissionByCode = async (code) => {
  logger.info(`${PermissionsConstant.LOGGER.PERMISSIONS_SERVICES}::findPermissionByCode::is called`);
  try{
    logger.info(`${PermissionsConstant.LOGGER.PERMISSIONS_SERVICES}::findPermissionByCode::success`);
    return await PermissionsModel.findOne({
      where: { code }
    });
  }catch(e){
    logger.error(`${PermissionsConstant.LOGGER.PERMISSIONS_SERVICES}::findPermissionByCode::error`, e);
    throw new Error(e);
  }
};

const getPermissions = async () => {
  logger.info(`${PermissionsConstant.LOGGER.PERMISSIONS_SERVICES}::getPermissions::is called`);
  try{
    logger.info(`${PermissionsConstant.LOGGER.PERMISSIONS_SERVICES}::getPermissions::success`);
    return await PermissionsModel.findAll();
  }catch(e){
    logger.error(`${PermissionsConstant.LOGGER.PERMISSIONS_SERVICES}::getPermissions::error`, e);
    throw new Error(e);
  }
}

module.exports = {
  findPermissionByCode,
  getPermissions
}