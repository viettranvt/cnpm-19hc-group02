# MANAGE-STAFFS API
* CREATE STAFF
```

  Url: api/manage/staffs/

  Methob: POST 

  Body: 
  {
    "permission": string (["RECEPTIONIST", "RESTAURANT", "MANAGEMENT"])
    "fullName": string,
    "userName": string,
    "email": string,
    "phoneNumber": number
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

    userName has been taken:
    status: 400
    {
      "message": "UserName đã được đăng kí trước đó."
    }

    permission not found: 
    status: 404
    {
      "message": "Quyền của nhân viên không hợp lệ."
    }

    create staff success:
    status: 200
    {
      "message": "Tạo tài khoản thành công.",
      "staff": {
        "id": 4,
        "permissionId": 2,
        "fullName": "Trần Tuấn Việt",
        "userName": "Việt Trần",
        "email": "test.vt@gmail.com",
        "phoneNumber": "0328839449",
        "password": "$2b$10$eutZ2dKaz29PnkHUrhxT7OEQHVFhP4pggw.b8tNLIu/V7YOO7sHVC",
        "updatedAt": "2020-03-31T05:48:10.038Z",
        "createdAt": "2020-03-31T05:48:10.038Z",
        "deletedAt": null,
        "permission": {
          "id": 2,
          "name": "Lễ tân",
          "code": "RECEPTIONIST",
          "createdAt": "2020-03-30T14:13:33.147Z",
          "updatedAt": "2020-03-30T14:13:33.147Z",
          "deletedAt": null
        }
      }
    }


```

* GET STAFFS

```

  Url: api/manage/staffs/

  Methob: GET 

  query params: 
  {
    "permission": string (["RECEPTIONIST", "RESTAURANT", "MANAGEMENT"])
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

    get staffs success:
    status: 200
    {
      "message": "Lấy danh sách nhân viên thành công.",
      "staffs": [
        {
          "id": 2,
          "fullName": "RESTAURANT",
          "userName": "RESTAURANT",
          "password": "$2b$10$KUDieCmtiMAadUbsql2wwOnqpiitazX/EiVJYIDtAG7kptixwZEl.",
          "email": "resrtaurant@gmail.com",
          "phoneNumber": "0328889999",
          "permissionId": 1,
          "createdAt": "2020-03-30T14:13:34.202Z",
          "updatedAt": "2020-03-30T14:13:34.202Z",
          "deletedAt": null,
          "permission": {
            "id": 1,
            "name": "Nhà hàng",
            "code": "RESTAURANT",
            "createdAt": "2020-03-30T14:13:33.119Z",
            "updatedAt": "2020-03-30T14:13:33.119Z",
            "deletedAt": null
          }
        }
      ]
    }

```

* RESET PASSWORD

```

  Url: api/manage/staffs/reset-password

  Methob: PUT 

  body: 
  {
    "staffId": number
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

    staff not found: 
    status: 404
    {
      "message": "Không tìm thấy thông tin nhân viên."
    }
    
    reset password success:
    status: 200
    {
      "message": "Reset thành công. Mật khẩu là số điện thoại của nhân viên."
    }

```

* UPDATE STAFF

```

  Url: api/manage/staffs/

  Methob: PUT 

  body: 
  {
    "staffId": number,
    "permission"?: string (["RECEPTIONIST", "RESTAURANT", "MANAGEMENT"])
    "fullName"?: string,
    "userName"?: string,
    "email"?: string,
    "phoneNumber"?: number
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

    staff not found: 
    status: 404
    {
      "message": "Không tìm thấy thông tin nhân viên."
    }

    permission not found: 
    status: 404
    {
      "message": "Quyền của nhân viên không hợp lệ."
    }
    
    reset password success:
    status: 200
    {
      "message": "Cập nhật thông tin thành công.",
      "staff": {
        "id": 4,
        "fullName": "Trần Việt",
        "userName": "Trần Việt",
        "password": "$2b$10$Ng0C6vA353NNuLqlZO6jLeb0l7.jUUl0cOh09dtkYuCqbQYIvlDTu",
        "email": "test1.vt@gmail.com",
        "phoneNumber": "0328839559",
        "permissionId": 1,
        "createdAt": "2020-03-31T05:48:10.038Z",
        "updatedAt": "2020-04-01T06:51:47.895Z",
        "deletedAt": null,
        "permission": {
          "id": 1,
          "name": "Nhà hàng",
          "code": "RESTAURANT",
          "createdAt": "2020-03-30T14:13:33.119Z",
          "updatedAt": "2020-03-30T14:13:33.119Z",
          "deletedAt": null
        }
      }
    }

```