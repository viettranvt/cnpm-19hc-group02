const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const PaginationConstant = require('../../constants/pagination.constant');
const StaffActivitiesConstant = require('./staff-activities.constant');
const StaffActivitiesServices = require('./staff-activities.services');

const { ManageGetStaffActivitiesValidationSchema } = require('./validations/manage-get-staff-activities.schema');

const getStaffActivities = async (req, res, next) => {
  logger.info(`${StaffActivitiesConstant.LOGGER.MANAGE_STAFF_ACTIVITIES_CONTROLLERS}::getStaffActivities::is called`);
  try{
    const { error } = Joi.validate(req.query, ManageGetStaffActivitiesValidationSchema);
    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { staffId, name, limit, page } = req.query;
    page = !Number(page) ? PaginationConstant.PAGE : Number(page);
    limit = !Number(limit) ? PaginationConstant.LIMIT : Number(limit);

    const staffActivities = await StaffActivitiesServices.getStaffActivities({staffId, name, limit, page});

    logger.info(`${StaffActivitiesConstant.LOGGER.MANAGE_STAFF_ACTIVITIES_CONTROLLERS}::getStaffActivities::success`);
    return res.status(HttpStatus.OK).json({
      message: StaffActivitiesConstant.MESSAGES.MANAGE.GET_STAFF_ACTIVITIES.GET_STAFF_ACTIVITIES_SUCCESS,
      staffActivities
    });
  }catch(e){
    logger.info(`${StaffActivitiesConstant.LOGGER.MANAGE_STAFF_ACTIVITIES_CONTROLLERS}::getStaffActivities::error`, e);
    return next(e);
  }
};

module.exports = {
  getStaffActivities
};