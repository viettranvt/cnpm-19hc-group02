const express = require('express');
const router = express.Router({});
const BookingsSerivesControllers = require('./booking-services.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware');

router.post('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, BookingsSerivesControllers.createBookingService);

module.exports = router;