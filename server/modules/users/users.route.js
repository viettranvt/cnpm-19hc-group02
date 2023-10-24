const express = require('express');
const router = express.Router({});
const UsersController = require('./users.controller');
const CheckTokenMiddleware = require('../../middlewares/check-token.middlewares');
const CheckRoleReceptionistMiddleware = require('../../middlewares/check-role-receptionist.middleware');

router.post('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, UsersController.createdUser);
router.delete('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, UsersController.deleteUser);
router.put('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, UsersController.updateUser);
router.get('/', CheckTokenMiddleware, CheckRoleReceptionistMiddleware, UsersController.getListUsers);

module.exports = router;
