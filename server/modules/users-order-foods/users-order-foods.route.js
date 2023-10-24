const express = require('express');
const router = express.Router({});
const UserOrderFoodsController = require('./users-order-foods.controller');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleRestaurantMiddleware = require('../../middlewares/check-role-restaurant.middleware')

router.post('/', CheckTokenMiddleware, CheckRoleRestaurantMiddleware, UserOrderFoodsController.createUserOrderFood);

module.exports = router;
