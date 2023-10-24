const express = require('express');
const router = express.Router({});
const Controller = require('./rooms.controller');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware')

router.get('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, Controller.getRooms);

module.exports = router;
