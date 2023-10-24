const express = require('express');
const router = express.Router({});
const ManageStaffActivitiesController = require('./manage-staff-activities.controllers');

const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');

router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageStaffActivitiesController.getStaffActivities);

module.exports = router;
