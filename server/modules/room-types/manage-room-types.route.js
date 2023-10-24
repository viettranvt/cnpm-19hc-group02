const express = require('express');
const router = express.Router({});
const ManageRoomTypesControllers = require('./manage-room-types.controllers');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware')

router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageRoomTypesControllers.getRoomTypes);
router.put('/price', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageRoomTypesControllers.updatePrice);
router.post('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageRoomTypesControllers.createRoomType);

module.exports = router;
