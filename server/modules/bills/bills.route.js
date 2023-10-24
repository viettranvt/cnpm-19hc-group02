const express = require('express');
const router = express.Router({});
const BillsController = require('./bills.controllers');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware');

router.post('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, BillsController.createBill);
router.get('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, BillsController.getBillInfo);

module.exports = router;
