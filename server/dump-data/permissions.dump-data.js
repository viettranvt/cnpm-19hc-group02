const PermissionsConstant = require('../modules/permissions/permissons.constant');
const PermissionsModel = require('../modules/permissions/permissions.model');
const DumpDataConstant = require('./dump-data.constant');
const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const createPermission = async () => {
  logger.info(`${DumpDataConstant.LOGGER.PERMISSONS}::createPermission::is called`);
  try {
    const permissions = [
      PermissionsConstant.TYPE.RESTAURANT,
      PermissionsConstant.TYPE.RECEPTIONIST,
      PermissionsConstant.TYPE.MANAGEMENT
    ];

    const config = {
      [PermissionsConstant.TYPE.MANAGEMENT]: {
        name: PermissionsConstant.NAME.MANAGEMENT,
        code: PermissionsConstant.TYPE.MANAGEMENT
      },
      [PermissionsConstant.TYPE.RECEPTIONIST]: {
        name: PermissionsConstant.NAME.RECEPTIONIST,
        code: PermissionsConstant.TYPE.RECEPTIONIST
      },
      [PermissionsConstant.TYPE.RESTAURANT]: {
        name: PermissionsConstant.NAME.RESTAURANT,
        code: PermissionsConstant.TYPE.RESTAURANT
      }
    };

    await Promise.all(
      permissions.map(async type => {
        const permission = await PermissionsModel.findOne({
          where: { code: type }
        });
        if (!permission) {
          logger.info(`${DumpDataConstant.LOGGER.PERMISSONS}::createPermission::creating ${type}`);
          const newPermission = new PermissionsModel(config[type]);
          await newPermission.save();
        }
      })
    );

    logger.info(`${DumpDataConstant.LOGGER.PERMISSONS}::createPermission::success`);
    return;
  } catch (e) {
    logger.error(`${DumpDataConstant.LOGGER.PERMISSONS}::createPermission::error`, e);
    throw new Error(e);
  }
};

module.exports = async () => {
  await createPermission();
};
