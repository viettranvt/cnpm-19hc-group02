const log4js = require('log4js');
const logger = log4js.getLogger('Services');

const BookingServicesModel = require('./booking-services.model');
const BookingServicesConstant = require('./booking-services.constant');

const createBookingServices = async ({staff, booking, services}) => {
  logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_SERVICES}::createBookingServices::is called`);
  try{
    const bookingServices = [];
    await Promise.all(
      services.map(async service => {
        const newBookingService = new BookingServicesModel({
          staffId: staff.id,
          bookingId: booking.id,
          serviceId: service.serviceId,
          number: service.number
        });
        logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_SERVICES}::createBookingServices::success`);
        await newBookingService.save();
        bookingServices.push(newBookingService);
      })
    );
    
    return bookingServices;
  }catch(e){
    logger.error(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_SERVICES}::createBookingServices::error`);
    throw new Error(e);
  }
};

const mapServicesDataWithBookingServicesData = ({bookingServices, services}) => {
  logger.info(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_SERVICES}::mapServicesDataWithBookingServicesData::is called`);
  try{
    let bookingServicesJsonParse = JSON.parse(JSON.stringify(bookingServices));
    let servicesJsonParse = JSON.parse(JSON.stringify(services));

    let bookingServicesInfo = {
      bookingServicesInfo: [],
      totalBookingServicesPrice: 0
    };

    bookingServicesInfo['bookingServicesInfo'] = bookingServicesJsonParse.map(bookingService => {
      let service = servicesJsonParse.filter(service => service.id == bookingService.serviceId);
      delete bookingService.id;
      delete bookingService.serviceId;
      delete bookingService.staffId;
      delete bookingService.bookingId;
      delete bookingService.updatedAt;
      delete bookingService.deletedAt;
      bookingService['service'] = {};

      if(service.length > 0)
      {
        let serviceInfo = JSON.parse(JSON.stringify(service[0]));
        delete serviceInfo.id;
        delete serviceInfo.createdAt;
        delete serviceInfo.updatedAt;
        delete serviceInfo.deletedAt;

        bookingService['service'] = serviceInfo;
        bookingService['totalServicePrice'] = serviceInfo.price * bookingService.number;
      }

      return bookingService;
    });

    bookingServicesInfo['totalBookingServicesPrice'] = bookingServicesInfo['bookingServicesInfo'].reduce((price, bookingService) => {
      return price += bookingService.totalServicePrice;
    }, 0);

    return bookingServicesInfo;
  }catch(e){
    logger.error(`${BookingServicesConstant.LOGGER.BOOKING_SERVICES_SERVICES}::mapServicesDataWithBookingServicesData::error`);
    throw new Error(e);
  }
};

module.exports = {
  createBookingServices,
  mapServicesDataWithBookingServicesData
}