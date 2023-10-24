const express = require('express');
const router = express.Router({});
const BookingsControllers = require('./bookings.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware');

router.post('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, BookingsControllers.createBooking);
router.get('/', CheckTokenMiddleware, BookingsControllers.getBookings);

module.exports = router;