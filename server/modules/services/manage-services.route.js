const express = require('express');
const router = express.Router({});
const ManageServicesControllers = require('./manage-services.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware');

router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageServicesControllers.getServices);
router.put('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageServicesControllers.updateService);
router.post('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageServicesControllers.createService);

module.exports = router;