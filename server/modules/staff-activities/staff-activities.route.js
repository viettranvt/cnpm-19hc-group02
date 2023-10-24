const express = require('express');
const router = express.Router({});
const StaffActivitiesController = require('./staff-activities.controllers');

const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');

router.get('/', CheckTokenMiddleware, StaffActivitiesController.getStaffActivities);

module.exports = router;
