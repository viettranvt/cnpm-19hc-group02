const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');

const StaffActivitiesConstant = require('./staff-activities.constant');
const StaffActivitiesModel = require('./staff-activities.model');

const createStaffActivities = async ({staff, name, description}) => {
  logger.info(`${StaffActivitiesConstant.LOGGER.STAFF_ACTIVITIES_SERVICES}::createStaffActivities::is called`);
  try{
    const newStaffActivities = new StaffActivitiesModel({
      staffId: staff.id,
      name,
      description
    });

    logger.info(`${StaffActivitiesConstant.LOGGER.STAFF_ACTIVITIES_SERVICES}::createStaffActivities::success.`);
    return await newStaffActivities.save();
  }catch(e){
    logger.error(`${StaffActivitiesConstant.LOGGER.STAFF_ACTIVITIES_SERVICES}::createStaffActivities::error`, e);
    throw new Error(e);
  }
};

const getStaffActivities = async ({staffId, name, limit, page}) => {
  logger.info(`${StaffActivitiesConstant.LOGGER.STAFF_ACTIVITIES_SERVICES}::getStaffActivities::is called`);
  try{
    let queryConditions = {};

    if(staffId)
    {
      queryConditions['staffId'] = staffId;
    }

    if(name)
    {
      queryConditions['name'] = name;
    }

    logger.info(`${StaffActivitiesConstant.LOGGER.STAFF_ACTIVITIES_SERVICES}::getStaffActivities::success.`);
    return await StaffActivitiesModel.findAndCountAll({
      where: queryConditions,
      order: [['createdAt', 'DESC']],
      offset: (page - 1) * limit,
      limit
    });
  }catch(e){
    logger.error(`${StaffActivitiesConstant.LOGGER.STAFF_ACTIVITIES_SERVICES}::getStaffActivities::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  createStaffActivities,
  getStaffActivities
};