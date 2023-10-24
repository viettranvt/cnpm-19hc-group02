module.exports = {
  TYPES: {
    ENTERTAIMENT: 'Giải trí/Thể thao',
    RELAX: 'Thư giãn',
    ORTHER: 'Khác'
  },
  LOGGER: {
    SERVICES_CONTROLLERS: 'ServicesController',
    SERVICES_SERVICES:'ServicesServices',
    MANAGE_SERVICES_CONTROLLERS: 'ManageServicesController'
  },
  MESSAGES: {
    GET_SERVICES: {
      GET_SERVICES_SUCCESS: 'Lấy danh sách dịch vụ thành công.'
    },
    MANAGE: {
      GET_SERVICES: {
        GET_SERVICES_SUCCESS: 'Lấy danh sách dịch vụ thành công.'
      },
      UPDATE_SERVICE: {
        SERVICES_NOT_FOUND: 'Không tìm thấy dịch vụ.',
        NAME_EXISTS: 'Tên dịch vụ đã tồn tại.',
        UPDATE_SERVICES_SUCCESS: 'Cập nhật dịch vụ thành công.'
      },
      CREATE_SERVICE: {
        NAME_EXISTS: 'Tên dịch vụ đã tồn tại.',
        CREATE_SERVICES_SUCCESS: 'Tạo dịch vụ thành công.'
      }
    }
  }
};