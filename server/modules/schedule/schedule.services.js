"use strict"

const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const Constant = require('./schedule.constant');
const Schedule = require('./schedule.model');
const StaffsModel = require('../staffs/staffs.model');
const ModelConstant = require('../../models/models.constant');
const moment = require('moment');

const getSchedules = async (staffId) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::getSchedule::Is called`);
  try {
    let include = [
      {
        model: StaffsModel,
        as: ModelConstant.SCHEDULE_THROUGH_STAFFS,
        duplicating: false
      },
      {
        model: StaffsModel,
        as: ModelConstant.SCHEDULE_THROUGH_CREATOR,
        duplicating: false
      },
    ]

    let queryConditions = {};

    if (staffId) {
      queryConditions['staffId'] = staffId;
    }

    logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::getSchedule::success`);
    return await Schedule.findAll({
      where: queryConditions,
      order: [['createdAt', 'DESC']],
      include
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_SERVICES}::getSchedule::Error`, e);
    throw new Error(e);
  }
};

const getRoomById = async (roomId) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::getRoomById::Is called`);
  try {
    logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::getRoomById::success`);
    return await Schedule.findOne({
      where: {
        id: roomId
      },
      include: [{
        model: ScheduleTypeModel,
        as: ModelConstant.SCHEDULE_THROUGH_ROOM_TYPES,
        duplicating: false
      }]
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_SERVICES}::getRoomById::Error`, e);
    throw new Error(e);
  }
}

const createSchedule = async ({ creatorId, staffId, startDate, endDate, note }) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::createSchedule::is called.`);
  try {
    const schedule = new Schedule({
      creatorId: creatorId,
      staffId: staffId,
      notes: note || '',
      startDate: startDate,
      endDate: endDate,
    });

    await schedule.save();
    logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::createSchedule::success.`);
    return schedule;
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_SERVICES}::createSchedule::error.`, e);
    throw new Error(e);
  }
};

const findScheduleById = async (scheduleId) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::findScheduleById::Is called`);
  try {
    let include = [
      {
        model: StaffsModel,
        as: ModelConstant.SCHEDULE_THROUGH_STAFFS,
        duplicating: false
      },
      {
        model: StaffsModel,
        as: ModelConstant.SCHEDULE_THROUGH_CREATOR,
        duplicating: false
      },
    ]

    logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::findScheduleById::success`);
    return await Schedule.findOne({
      where: { id: scheduleId },
      include
    });
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_SERVICES}::findScheduleById::Error`, e);
    throw new Error(e);
  }
};

const validationTime = ({schedule, startDate, endDate}) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::validationTime::is called.`);
  try {
    let response = {
      isError: false,
      message: ''
    };

    if(startDate){
      const endDateInSchedule = moment(schedule.endDate);

      if(startDate.isAfter(endDateInSchedule)){
        response.isError = true;
        response.message = Constant.MESSSAGES.UPDATE_SCHEDULE.START_DATE_IS_AFTER_END_DATE;
      }
    }

    if(endDate){
      const startInSchedule = moment(schedule.startDate);

      if(startInSchedule.isAfter(endDate)){
        response.isError = true;
        response.message = Constant.MESSSAGES.UPDATE_SCHEDULE.START_DATE_IS_AFTER_END_DATE;
      }
    }

    if(startDate && endDate){
      if(startDate.isAfter(endDate)){
        response.isError = true;
        response.message = Constant.MESSSAGES.UPDATE_SCHEDULE.START_DATE_IS_AFTER_END_DATE;
      }
    }

    logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::validationTime::success.`);
    return response;
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_SERVICES}::validationTime::error.`, e);
    throw new Error(e);
  }
};

const updateSchedule = async ({schedule, startDate, endDate, notes}) => {
  logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::updateSchedule::is called.`);
  try {
    if(startDate){
      schedule.startDate = startDate;
    }

    if(endDate){
      schedule.endDate = endDate;
    }

    if(notes){
      schedule.notes = notes;
    }

    logger.info(`${Constant.LOGGER.SCHEDULE_SERVICES}::updateSchedule::success.`);
    return await schedule.save();
  } catch (e) {
    logger.error(`${Constant.LOGGER.SCHEDULE_SERVICES}::updateSchedule::error.`, e);
    throw new Error(e);
  }
}

module.exports = {
  createSchedule,
  getSchedules,
  getRoomById,
  findScheduleById,
  validationTime,
  updateSchedule
};