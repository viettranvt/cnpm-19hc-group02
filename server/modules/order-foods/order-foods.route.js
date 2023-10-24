const express = require('express');
const router = express.Router({});
const OrderFoodsControllers = require('./order-foods.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleRestaurantMiddleware = require('../../middlewares/check-role-restaurant.middleware');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware');

router.post('/', CheckTokenMiddleware, OrderFoodsControllers.createOrderFoods);

module.exports = router;