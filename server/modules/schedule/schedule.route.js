const express = require('express');
const router = express.Router({});
const Controller = require('./schedule.controller');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware')

router.get('/', CheckTokenMiddleware, Controller.getSchedules);
router.post('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, Controller.createSchedule);
router.put('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, Controller.updateSchedule);

module.exports = router;
