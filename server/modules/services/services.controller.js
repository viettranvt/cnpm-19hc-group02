const log4js = require('log4js');
const logger = log4js.getLogger('Controllers');
const HttpStatus = require("http-status-codes");

const ServicesConstant = require('./services.constant');
const ServicesServices = require('./services.services');

const getServices = async (req, res, next) => {
  logger.info(`${ServicesConstant.LOGGER.SERVICES_CONTROLLERS}::getServices::is called`);
  try{
    const services = await ServicesServices.getServices();

    logger.info(`${ServicesConstant.LOGGER.SERVICES_CONTROLLERS}::getServices::success`);
    return res.status(HttpStatus.OK).json({
      message: ServicesConstant.MESSAGES.GET_SERVICES.GET_SERVICES_SUCCESS,
      services
    })
  }catch(e){
    logger.error(`${ServicesConstant.LOGGER.SERVICES_CONTROLLERS}::getServices::error`, e);
    return next(e);
  }
};

module.exports = {
  getServices
}