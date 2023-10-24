"use strict"

const Joi = require('@hapi/joi');
const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require('http-status-codes');

const Foods = require('./foods.model');
const Constant = require('./foods.constant');
const Services = require('./foods.services');


const getFoods = async (req, res, next) => {
  logger.info(`${Constant.LOGGER.FOODS_CONTROLLERS}::getFoods::is called`);
  try {
    var foods = await Services.getFoods();
    return res.status(HttpStatus.OK).json({
      message: "",
      foods: foods,
    });
  } catch (exception) {
    logger.error(`${Constant.LOGGER.FOODS_CONTROLLERS}::getFoods::error`, exception);
    return next(exception);
  }
};

module.exports = {
  getFoods,
};
