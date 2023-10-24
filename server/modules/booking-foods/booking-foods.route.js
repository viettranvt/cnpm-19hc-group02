const express = require('express');
const router = express.Router({});
const BookingFoodsControllers = require('./booking-foods.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleRestaurantMiddleware = require('../../middlewares/check-role-restaurant.middleware');

router.get('/', CheckTokenMiddleware, BookingFoodsControllers.getBookingFoods);
router.put('/confirmed', CheckTokenMiddleware, CheckRoleRestaurantMiddleware, BookingFoodsControllers.updateConfirmed);

module.exports = router;