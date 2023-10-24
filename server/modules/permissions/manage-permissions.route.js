const express = require('express');
const router = express.Router({});
const ManagePermissionsControllers = require('./manage-permissions.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware');

router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManagePermissionsControllers.getPermissions);

module.exports = router;