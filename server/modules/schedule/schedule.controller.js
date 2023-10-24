"use strict"

const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const moment = require('moment');
const requestUtil = require('../../utils/RequestUtil');

const Constant = require('./schedule.constant');
const Services = require('./schedule.services');
const PermissionContant = require('../permissions/permissons.constant');
const StaffServices = require('../staffs/staffs.services');

const StaffActivitiesServices = require('../staff-activities/staff-activities.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');

const { CreateScheduleValidationSchema } = require('./validations/create-schedule.schema');
const { GetSchedulesValidationSchema } = require('./validations/get-schedules.schema');
const { UpdateScheduleValidationSchema } = require('./validations/update-schedule.schema');


const getSchedules = async (req, res, next) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::getSchedule::is called`);
  try {
    const { error } = Joi.validate(req.query, GetSchedulesValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { staffId } = req.query;
    
    if(req.permission.code != PermissionContant.TYPE.MANAGEMENT)
    {
      staffId = req.staff.id;
    }

    let schedules = await Services.getSchedules(staffId);

    return res.status(HttpStatus.OK).json({
      message: Constant.MESSSAGES.GET_SCHEDULES.GET_SCHEDULES_SUCCESS,
      schedules,
    });
  } catch (exception) {
    logger.error(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::getSchedule::error`, exception);
    return next(exception);
  }
};


const createSchedule = async (req, res, next) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::createSchedule::is called`);
  try {
    const { error } = Joi.validate(req.body, CreateScheduleValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { staffId, startDate, endDate, notes } = req.body;

    startDate = moment(Number(startDate));
    endDate = moment(Number(endDate));

    const staff = await StaffServices.findStaffById(staffId);

    if(!staff)
    {
      logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::createSchedule::Staff not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: Constant.MESSSAGES.CREATE_SCHEDULE.STAFF_NOT_FOUND
      });
    }

    if (startDate.isAfter(endDate)) {
      logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::createSchedule::Start date is affter end date`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: Constant.MESSSAGES.CREATE_SCHEDULE.START_DATE_IS_AFTER_END_DATE
      });
    }

    let schedule = await Services.createSchedule({
      creatorId: req.staff.id,
      staffId: staffId,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
    });

    await StaffActivitiesServices.createStaffActivities({
      staff: req.staff,
      name: StaffActivitiesConstant.NAME.SCHEDULE.CREATE_SCHEDULE,
      description: JSON.stringify(schedule),
    });

    schedule = JSON.parse(JSON.stringify(schedule));
    schedule['staff'] = staff;
    schedule['creator'] = req.staff;

    logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::createSchedule::success`);
    return res.status(HttpStatus.OK).json({
      message: Constant.MESSSAGES.CREATE_SCHEDULE.CREATE_SCHEDULE_SUCCESS,
      schedule
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::createSchedule::error`, e);
    return next(e);
  }
};

const updateSchedule = async (req, res, next) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::updateSchedule::is called.`);
  try {
    const { error } = Joi.validate(req.body, UpdateScheduleValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    let { scheduleId, startDate, endDate, notes } = req.body;

    let schedule = await Services.findScheduleById(scheduleId);

    startDate = startDate ? moment(Number(startDate)) : null;
    endDate = endDate ? moment(Number(endDate)) : null;

    if(!schedule)
    {
      logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::updateSchedule::Schedule not found.`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: Constant.MESSSAGES.UPDATE_SCHEDULE.SCHEDULE_NOT_FOUND
      });
    }

    const validation = Services.validationTime({schedule, startDate, endDate});

    if(validation.isError)
    {
      logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::updateSchedule::start date is after end date.`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: validation.message
      });
    }

    schedule = await Services.updateSchedule({schedule, startDate, endDate, notes});

    logger.info(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::updateSchedule::success.`);
    return res.status(HttpStatus.OK).json({
      message: Constant.MESSSAGES.UPDATE_SCHEDULE.UPDATE_SCHEDULE_SUCCESS,
      schedule
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_CONTROLLERS}::createSchedule::error`, e);
    return next(e);
  }
};

module.exports = {
  getSchedules,
  createSchedule,
  updateSchedule
};
