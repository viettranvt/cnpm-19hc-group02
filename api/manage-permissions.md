* GET PERMISSIONS

```

  Url: api/manage/permissions/

  Methob: GET 

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

    get staffs success:
    status: 200
    {
      "message": "Lấy danh sách quyền thành công",
      "permissions": [
        {
          "id": 1,
          "name": "Nhà hàng",
          "code": "RESTAURANT",
          "createdAt": "2020-03-30T14:13:33.119Z",
          "updatedAt": "2020-03-30T14:13:33.119Z",
          "deletedAt": null
        },
        {
          "id": 2,
          "name": "Lễ tân",
          "code": "RECEPTIONIST",
          "createdAt": "2020-03-30T14:13:33.147Z",
          "updatedAt": "2020-03-30T14:13:33.147Z",
          "deletedAt": null
        },
        {
          "id": 3,
          "name": "Quản lý",
          "code": "MANAGEMENT",
          "createdAt": "2020-03-30T14:13:33.182Z",
          "updatedAt": "2020-03-30T14:13:33.182Z",
          "deletedAt": null
        }
      ]
    }

```