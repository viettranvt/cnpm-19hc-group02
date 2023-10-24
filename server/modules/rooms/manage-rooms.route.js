const express = require('express');
const router = express.Router({});
const ManageRoomsControllers = require('./manage-rooms.controllers');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware')

router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageRoomsControllers.getRooms);
router.post('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageRoomsControllers.createRoom);
router.put('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageRoomsControllers.updateRoom);

module.exports = router;
