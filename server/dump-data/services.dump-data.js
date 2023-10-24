const ServicesModel = require('../modules/services/services.model');
const ServicesConstant = require('../modules/services/services.constant');
const DumpDataConstant = require('./dump-data.constant');
const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const createServices = async () => {
  logger.info(`${DumpDataConstant.LOGGER.SERVICES}::createServices::Is called`);
  try {
    const Services = [
      'Truy cập wifi'
    ]

    const config = {
      ['Truy cập wifi']: {
        name: 'Truy cập wifi',
        type: ServicesConstant.TYPES.ORTHER,
        price: 50000,
        description: 'Bạn sẽ được phép truy cập vào wifi của khách sạn với thời hạn là 24 tiếng. Hết 24 tiếng, hệ thống sẽ tự ngắt truy cập.',
      }
    };

    await Promise.all(
      Services.map(async name => {
        const service = await ServicesModel.findOne( { where: { name } } );

        if (!service) {
          logger.info(`${DumpDataConstant.LOGGER.SERVICES}::createServices::creating ${name}`);
          let newService = new ServicesModel(config[name]);
          await newService.save();
        }
      })
    );

    logger.info(`${DumpDataConstant.LOGGER.SERVICES}::createServices::success`);
    return;
  } catch (e) {
    logger.error(`${DumpDataConstant.LOGGER.SERVICES}::createStaff::error`, e);
    throw new Error(e);
  }
};

module.exports = async () => {
  await createServices();
}