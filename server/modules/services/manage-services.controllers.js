const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const Joi = require('@hapi/joi');
const requestUtil = require('../../utils/RequestUtil');
const HttpStatus = require("http-status-codes");

const ServicesConstant = require('./services.constant');
const ServicesServices = require('./services.services');
const StaffActivitiesConstant = require('../staff-activities/staff-activities.constant');
const StaffActivitiesServices = require('../staff-activities/staff-activities.services');

const { CreateServicesValidationSchema } = require('./validations/create-service.schema');
const { GetServicesValidationSchema } = require('./validations/manage-get-services.schema');
const { UpdateServicesValidationSchema } = require('./validations/update-service.schema');

const getServices = async (req, res, next) => {
  logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::getServices::is called`);
  try{
    const { error } = Joi.validate(req.query, GetServicesValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { type } = req.query;
    const services = await ServicesServices.getServicesHasConditions(type);

    logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::getServices::success`);
    return res.status(HttpStatus.OK).json({
      message: ServicesConstant.MESSAGES.MANAGE.GET_SERVICES.GET_SERVICES_SUCCESS,
      services
    });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::getServices::error`, e);
    return next(e);
  }
};

const updateService = async (req, res, next) => {
  logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::updateService::is called`);
  try{
    const { error } = Joi.validate(req.body, UpdateServicesValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { type, serviceId, price, description, name } = req.body;
    let service = await ServicesServices.findServiceById(serviceId);

    if(!service)
    {
      logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::updateService::service not found`);
      return res.status(HttpStatus.NOT_FOUND).json({
        message: ServicesConstant.MESSAGES.MANAGE.UPDATE_SERVICE.SERVICES_NOT_FOUND
      });
    }

    if(name){
      const serviceResult = await ServicesServices.findServiceByName(name);
      if(serviceResult)
      {
        if(serviceResult.id != service.id){
          logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::updateService::name exists`);
          return res.status(HttpStatus.BAD_REQUEST).json({
            message: ServicesConstant.MESSAGES.MANAGE.UPDATE_SERVICE.NAME_EXISTS
          });
        }
      }
    }

    let serviceInfo = {
      oldService: service
    };
    service = await ServicesServices.updateService({service, name, type, price, description});
    serviceInfo['service'] = service;
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.SERVICES.UPDATE, description: JSON.stringify(serviceInfo)});

    logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::updateService::success`);
    return res.status(HttpStatus.OK).json({
      message: ServicesConstant.MESSAGES.MANAGE.UPDATE_SERVICE.UPDATE_SERVICES_SUCCESS,
      service
    });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::updateService::error`, e);
    return next(e);
  }
};

const createService = async (req, res, next) => {
  logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::createService::is called`);
  try{
    const { error } = Joi.validate(req.body, CreateServicesValidationSchema);

    if (error) {
      return requestUtil.joiValidationResponse(error, res);
    }

    const { type, price, description, name } = req.body;
    let service = await ServicesServices.findServiceByName(name);
    console.log(service);

    if(service)
    {
      logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::createService::name exists`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: ServicesConstant.MESSAGES.MANAGE.CREATE_SERVICE.NAME_EXISTS
      });
    }

    service = await ServicesServices.createService({name, type, price, description});
    await StaffActivitiesServices.createStaffActivities({staff: req.staff, name: StaffActivitiesConstant.NAME.MANAGE.SERVICES.CREATE, description: JSON.stringify(service)});

    logger.info(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::createService::success`);
    return res.status(HttpStatus.OK).json({
      message: ServicesConstant.MESSAGES.MANAGE.CREATE_SERVICE.CREATE_SERVICES_SUCCESS,
      service
    });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.MANAGE_SERVICES_CONTROLLERS}::createService::error`, e);
    return next(e);
  }
};

module.exports = {
  getServices,
  updateService,
  createService
};