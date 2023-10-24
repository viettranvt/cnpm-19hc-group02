const log4js = require('log4js');
const logger = log4js.getLogger('Services');
const Sequelize = require('sequelize');

const ServicesModel = require('./services.model');
const ServicesConstant = require('./services.constant');

const findServiceByIds = async (serviceIds) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceByIds::is called`);
  try{
    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceByIds::success`);
    return await ServicesModel.findAll({ where: {id: {[Sequelize.Op.in]: serviceIds } } });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceByIds::error`, e);
    throw new Error(e);
  }
};

const getServices = async () => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::getServices::is called`);
  try{
    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::getServices::success`);
    return await ServicesModel.findAll();
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::getServices::error`, e);
    throw new Error(e);
  }
};

const getServicesHasConditions = async (type) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::getServicesHasConditions::is called`);
  try{
    let queryConditions = {};

    if(type){
      queryConditions['type'] = type;
    }
    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::getServicesHasConditions::success`);
    return await ServicesModel.findAll({
      where: queryConditions
    });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::getServicesHasConditions::error`, e);
    throw new Error(e);
  }
};

const findServiceByName = async (name) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceByName::is called`);
  try{
    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceByName::success`);
    return await ServicesModel.findOne({
      where: { name }
    });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceByName::error`, e);
    throw new Error(e);
  }
};

const findServiceById = async (serviceId) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceById::is called`);
  try{
    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceById::success`);
    return await ServicesModel.findOne({
      where: { id: serviceId }
    });
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::findServiceById::error`, e);
    throw new Error(e);
  }
};

const updateService = async ({service, name, type, price, description}) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::updateService::is called`);
  try{
    if(name)
    {
      service.name = name;
    }

    if(type)
    {
      service.type = type;
    }

    if(price)
    {
      service.price = price;
    }

    if(description)
    {
      service.description = description;
    }

    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::updateService::success`);
    return await service.save();
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::updateService::error`, e);
    throw new Error(e);
  }
};

const createService = async ({name, type, price, description}) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::createService::is called`);
  try{
    const newService = new ServicesModel({
      name,
      type, 
      price,
      description
    });

    logger.info(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::createService::success`);
    return await newService.save();
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_SERVICES}::createService::error`, e);
    throw new Error(e);
  }
};

module.exports = {
  findServiceByIds,
  getServices,
  getServicesHasConditions,
  findServiceByName,
  findServiceById,
  updateService,
  createService
};