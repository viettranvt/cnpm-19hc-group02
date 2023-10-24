const express = require('express');
const router = express.Router({});
const ManageFoodsControllers = require('./manage-foods.controllers');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleRestaurantMiddleware = require('../../middlewares/check-role-restaurant.middleware')

router.get('/', CheckTokenMiddleware, CheckRoleRestaurantMiddleware, ManageFoodsControllers.getFoods);
router.post('/', CheckTokenMiddleware, CheckRoleRestaurantMiddleware, ManageFoodsControllers.createFood);
router.put('/', CheckTokenMiddleware, CheckRoleRestaurantMiddleware, ManageFoodsControllers.updateFood);

module.exports = router;
