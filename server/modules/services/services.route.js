const express = require('express');
const router = express.Router({});
const ServicesControllers = require('./services.controller');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware');

router.get('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, ServicesControllers.getServices);

module.exports = router;