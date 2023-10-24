# MANAGE-STAFF-ACTIVITIES API

* GET STAFF ACTIVITIES:
```

  Url: api/manage/staff-activities/

  Methob: GET 

  query params: 
  {
    staffId?: number,
    limit?: number,
    page?: number,
    name?: string ([
      'Nhân viên vừa tạo thông tin khách hàng.',
      'Nhân viên vừa cập nhập thông tin khách hàng.',
      'Nhân viên xóa thông tin khách hàng.'
      'Nhân viên vừa tạo thông tin đặt phòng.'
      'Nhân viên vừa cập nhật mật khẩu.'
      'Tạo lịch làm việc.'
      'Nhân viên vừa thêm dịch vụ.'
      'Nhân viên vừa đặt thức ăn cho khách.'
      'Nhân viên vừa gọi món cho khách.'
      'Nhân viên vừa tạo thông tin thanh toán'
      'Nhân viên vừa tạo hóa đơn thức ăn cho khách không đặt phòng.'
      'Nhân viên vừa tạo thông tin cho khách không đặt phòng.'
      'Nhân viên vừa đặt thức ăn cho khách không đặt phòng.'
      'Quản lý thay đổi giá tiền cho loại phòng.',
      'Quản lý vừa tạo loại phòng.'
      'Quản lý vừa tạo phòng.',
      'Quản lý vừa chỉnh sửa phòng'
      'Quản lý vừa tạo dịch vụ.',
      'Quản lý vừa chỉnh sửa dịch vụ'
      'Quản lý vừa tạo thức ăn.',
      'Quản lý vừa chỉnh sửa thức ăn'
      'Quản lý vừa tạo tài khoản cho nhân viên.',
      'Quản lý vừa chỉnh sửa thông tin nhân viên'
    ])
  }

  Header:
  {
    accessToken: string(role: MANAGEMENT)
  } 

  Result:
    Unknown error:
    status: 400 || 500
    {
      "message": error
    }

    permission denied: 
    status: 401
    {
       "message": "Không được phép truy cập."
    }

    get staff activities success:
    status: 200
    {
      "message": "Lấy danh sách hành động thành công.",
      "staffActivities": {
        "count": 3,
        "rows": [
          {
              "id": 27,
              "staffId": 3,
              "name": "Quản lý vừa chỉnh sửa thức ăn",
              "description": "{\"oldFood\":{\"id\":15,\"name\":\"Bún đậu mắm tôm\",\"group\":\"Món khô\",\"price\":55000,\"description\":\"Bún lá ăn với đậu chiên, mắm tôm vắt chanh và ớt đánh sủi bọt. Rau sống đi kèm thường có rau kinh giới.\",\"createdAt\":\"2020-04-04T07:21:52.792Z\",\"updatedAt\":\"2020-04-04T13:43:27.739Z\",\"deletedAt\":null},\"food\":{\"id\":15,\"name\":\"Bún đậu mắm tôm\",\"group\":\"Món khô\",\"price\":55000,\"description\":\"Bún lá ăn với đậu chiên, mắm tôm vắt chanh và ớt đánh sủi bọt. Rau sống đi kèm thường có rau kinh giới.\",\"createdAt\":\"2020-04-04T07:21:52.792Z\",\"updatedAt\":\"2020-04-04T13:43:27.739Z\",\"deletedAt\":null}}",
              "createdAt": "2020-04-04T13:43:27.940Z",
              "updatedAt": "2020-04-04T13:43:27.940Z",
              "deletedAt": null
          }
        ]
      }
    }

```