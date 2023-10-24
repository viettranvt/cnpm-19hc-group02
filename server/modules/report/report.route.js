const express = require('express');
const router = express.Router({});
const ReportControllers = require('./report.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware');

router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ReportControllers.getReport);
router.get('/restaurant', CheckTokenMiddleware, CheckRoleManagerMiddleware, ReportControllers.getReportForRestaurant);

module.exports = router;