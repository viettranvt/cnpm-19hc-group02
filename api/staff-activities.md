# STAFF-ACTIVITIES API

* GET STAFF ACTIVITIES:
```

  Url: api/staff-activities/

  Methob: GET 

  query params: 
  {
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
    accessToken: string
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
        "count": 1,
        "rows": [
          {
              "id": 28,
              "staffId": 1,
              "name": "Nhân viên vừa tạo thông tin khách hàng.",
              "description": "{\"id\":1,\"fullName\":\"Trần Tuấn Việt\",\"address\":\"227 Nguyễn Văn Cừ, Quận 5\",\"phoneNumber\":\"0328839556\",\"identityType\":\"Chứng minh nhân dân\",\"identityId\":\"219218214\",\"updatedAt\":\"2020-04-06T14:00:28.207Z\",\"createdAt\":\"2020-04-06T14:00:28.207Z\",\"deletedAt\":null}",
              "createdAt": "2020-04-06T14:00:28.375Z",
              "updatedAt": "2020-04-06T14:00:28.375Z",
              "deletedAt": null
          }
        ]
      }
    }

```