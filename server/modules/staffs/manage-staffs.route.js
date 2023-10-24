const express = require('express');
const router = express.Router({});
const ManageStaffsControllers = require('./manage-satffs.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleManagerMiddleware = require('../../middlewares/check-role-manager.middleware');

router.post('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageStaffsControllers.createStaff);
router.get('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageStaffsControllers.getStaffs);
router.put('/', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageStaffsControllers.updateStaff);
router.put('/reset-password', CheckTokenMiddleware, CheckRoleManagerMiddleware, ManageStaffsControllers.resetPassword);

module.exports = router;