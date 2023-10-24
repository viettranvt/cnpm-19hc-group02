module.exports = {
  IDENTITY_TYPE: {
    NICE_NUMBERS: 'Chứng minh nhân dân',
    TWELVE_NUMBERS: 'Căn cước công dân'
  },
  LOGGER: {
    USERS_CONTROLLERS: "UsersControllers",
    USERS_SERVICES: "UsersServices",
  },
  MESSAGES: {
    CREATE_USER: {
      IDENTITY_ID_IS_NOT_VALID: "Chứng minh nhân dân/căn cước công dân không hợp lệ.",
      IDENTITY_ID_EXISTS: "Chứng minh nhân dân/căn cước công dân đã tồn tại trong hệ thống.",
      CREATE_USER_SUCCESS: "Tạo thông tin khách hàng thành công."
    },
    DELETE_USER: {
      USER_NOT_FOUND: "Thông tin khách hàng không tồn tại.",
      DELETE_USER_SUCCESS: "Xóa thông tin khách hàng thành công."
    },
    UPDATE_USER: {
      IDENTITY_ID_IS_NOT_VALID: "Chứng minh nhân dân/căn cước công dân không hợp lệ.",
      USER_NOT_FOUND: "Thông tin khách hàng không tồn tại.",
      UPDATE_USER_SUCCESS: "Cập nhật thành công."
    },
    GET_LIST_USERS: {
      GET_LIST_USERS_SUCCESS: "Lấy danh sách khách hàng thành công."
    }
  }
};
