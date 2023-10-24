const express = require('express');
const router = express.Router({});
const StaffsController = require('./staffs.controller');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');

router.post('/login',StaffsController.login);
router.put('/password', CheckTokenMiddleware,StaffsController.updatePassword);

module.exports = router;
