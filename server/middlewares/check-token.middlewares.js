const StaffModel = require('../modules/staffs/staffs.model');
const PermissionsModel = require('../modules/permissions/permissions.model');
const jwt = require('jsonwebtoken');
const GlobalConstant = require('../constants/global-constant.constant');
const HttpStatus = require('http-status-codes');
const { JWTSecretKey } = require('../utils/secrets');

const returnInvalidToken = function (req, res) {
  return res.status(HttpStatus.UNAUTHORIZED).json({
    message: 'Invalid token',
    data: {}
  });
};

module.exports = async (req, res, next) => {
  try {
    const token =
      req.headers[GlobalConstant.ApiTokenName] ||
      req.query[GlobalConstant.ApiTokenName];

    if (token === null || token === undefined || token === '') {
      returnInvalidToken(req, res, next);
      return;
    }

    let staffInfo = jwt.verify(token, JWTSecretKey);
    const staff = await StaffModel.findOne({ where: { id: staffInfo.id } });

    if (!staff) {
      returnInvalidToken(req, res, next);
      return;
    }

    const permission = await PermissionsModel.findOne({ where: { id: staff.permissionId } });

    if (permission) {
      req.permission = permission;
    }

    req.staff = staff;
    return next();
  } catch (e) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: 'Invalid token',
      data: {}
    });
  }
};
