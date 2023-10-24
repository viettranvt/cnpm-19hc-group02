const StaffsModel = require('../modules/staffs/staffs.model');
const bcrypt = require('bcrypt');
const DumpDataConstant = require('../dump-data/dump-data.constant');
const PermissionsConstant = require('../modules/permissions/permissons.constant');
const PermissionsModel = require('../modules/permissions/permissions.model');
const StaffConstant = require('../modules/staffs/staffs.constant');
const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const createStaff = async () => {
  logger.info(`${DumpDataConstant.LOGGER.STAFFS}::createStaff::Is called`);
  try {
    const staffs = [
      PermissionsConstant.TYPE.RESTAURANT,
      PermissionsConstant.TYPE.RECEPTIONIST,
      PermissionsConstant.TYPE.MANAGEMENT
    ]

    const config = {
      [PermissionsConstant.TYPE.RESTAURANT]: {
        fullName: 'RESTAURANT',
        userName: 'RESTAURANT',
        password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(StaffConstant.SALT_LENGTH)),
        email: 'resrtaurant@gmail.com',
        phoneNumber: '0328889999'
      },
      [PermissionsConstant.TYPE.MANAGEMENT]: {
        fullName: 'MANAGEMENT',
        userName: 'MANAGEMENT',
        password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(StaffConstant.SALT_LENGTH)),
        email: 'management@gmail.com',
        phoneNumber: '0328881111'
      },
      [PermissionsConstant.TYPE.RECEPTIONIST]: {
        fullName: 'RECEPTIONIST',
        userName: 'RECEPTIONIST',
        password: bcrypt.hashSync('123456789', bcrypt.genSaltSync(StaffConstant.SALT_LENGTH)),
        email: 'receptionist@gmail.com',
        phoneNumber: '0328882222'
      }
    };

    await Promise.all(
      staffs.map(async userName => {
        const staff = await StaffsModel.findOne( { where: { userName } } );

        if (!staff) {
          const permission = await PermissionsModel.findOne( { where: { code: userName } } );

          if(permission)
          {
            logger.info(`${DumpDataConstant.LOGGER.PERMISSONS}::createStaff::creating ${userName}`);
            let newstaff = new StaffsModel(config[userName]);
            newstaff.permissionId = permission.id;
            await newstaff.save();
          }
        }
      })
    );

    logger.info(`${DumpDataConstant.LOGGER.STAFFS}::createStaff::success`);
    return;
  } catch (e) {
    logger.error(`${DumpDataConstant.LOGGER.STAFFS}::createStaff::error`, e);
    throw new Error(e);
  }
};

module.exports = async () => {
  await createStaff();
}