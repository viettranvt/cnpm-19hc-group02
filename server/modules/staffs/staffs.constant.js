module.exports = {
  SALT_LENGTH: 10,
  TOKEN_EXPIRED_IN_HOUR: 48,
  MESSAGES: {
    LOGIN: {
      USER_NAME_OR_PASSWORD_NOT_MATCHED: 'Tên đăng nhập hoặc mật khẩu không đúng!',
      LOGIN_SUCCESS: 'Đăng nhập thành công!'
    },
    UPDATE_PASSWORD: {
      OLD_PASSWORD_NOT_MATCHED: 'Mật khẩu cũ không đúng!',
      PASSWORD_AND_COMFIRMED_PASSWORD_NOT_MATCHED: 'Mật khẩu nhập lại không khớp!',
      UPDATE_PASSWORD_SUCCESS: 'Cập nhật thành công!',
    },
    CREATE_STAFF: {
      PERMISSION_NOT_FOUND: 'Quyền của nhân viên không hợp lệ.',
      USER_NAME_HAS_BEEN_TAKEN: 'UserName đã được đăng kí trước đó.',
      CREATE_STAFF_SUCCESS: 'Tạo tài khoản thành công.'
    },
    GET_STAFFS: {
      GET_STAFFS_SUCCESS: 'Lấy danh sách nhân viên thành công.'
    },
    RESET_PASSWORD: {
      STAFF_NOT_FOUND: 'Không tìm thấy thông tin nhân viên.',
      RESET_PASSWORD_SUCCESS: 'Reset thành công. Mật khẩu là số điện thoại của nhân viên.'
    },
    UPDATE_STAFF: {
      STAFF_NOT_FOUND: 'Không tìm thấy thông tin nhân viên.',
      PERMISSIONS_NOT_FOUND: 'Quyền của nhân viên không hợp lệ.',
      UPDATE_STAFF_SUCCESS: 'Cập nhật thông tin thành công.'
    }
  },
  LOGGER: {
    STAFFS_CONTROLLERS: 'StaffsControllers',
    STAFFS_SERVICES: 'StaffsServices',
    MANAGE_STAFFS_CONTROLLERS: 'ManageStaffsController',
    MANAGE_STAFFS_SERVICES: 'ManageStaffsServices'
  }
};