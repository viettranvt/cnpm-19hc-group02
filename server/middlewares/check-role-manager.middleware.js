const PermissionContant = require('../modules/permissions/permissons.constant');
const HttpStatus = require('http-status-codes');

module.exports = (req, res, next) => {
  try {
    const { permission } = req;

    if (permission.code != PermissionContant.TYPE.MANAGEMENT) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Không được phép truy cập.'
      });
    }

    return next();
  } catch (e) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: e,
      data: {}
    });
  }
};
