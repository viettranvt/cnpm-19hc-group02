# STAFFS API
* LOGIN
```
  Url: /api/staffs/login

  Methob: POST 

  Body: 
  {
    userName: string,
    password: string
  }

  Result:
    User_name or password not matched
    status: 400
    {
      "message": "Tên đăng nhập hoặc mật khẩu không đúng!"
    }

    Unknown error:
    status: 400 || 500
    {
      "message": error
    }

    Login success: 
    status: 200
    {
	    "message": "Đăng nhập thành công!",
	    "staff": {
	        "fullName": "RECEPTIONIST",
	        "userName": "RECEPTIONIST",
	        "email": "receptionist@gmail.com",
	        "phoneNumber": "0328882222",
	        "permission": {
	            "name": "Lễ tân",
	            "code": "RECEPTIONIST"
	        },
	        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg0Nzk0Njg2LCJleHAiOjE1ODQ5Njc0ODZ9.afG7FQhA38VV6rkd8mEBneLvx2xiNbobpsgCCK7_p9Y"
	    }
		}

```
* CHANGE PASSWORD:
```
  Url: /api/staffs/password

  Methob: PUT 

  Body: 
  {
    oldPassword: String,
    password: String,
    confirmedPassword: String
  }

  Header: 
  {
    accessToken: String
  }

  Result:
    Old password not matched
    {
        "message": "Mật khẩu cũ không đúng!"
    }

    Password and confirmed password not matched
    {
        "message": "Mật khẩu nhập lại không đúng!"
    }

    Unknown error:
    {
        "message": error
        
    }

    Change password success: 
    {
      "message": "Cập nhật thành công!"
    }

```