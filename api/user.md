# USERS API
* CREATE USER

```
Url: /api/users

  Methob: POST 

  Body: 
  {
    fullName: String,
    address: String,
    phoneNumber: String,
    identityId: String
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

    identity id is valid
    status: 400
    {
      "message": "Chứng minh nhân dân/căn cước công dân không hợp lệ."
    }

    identity id exists
    status: 400
    {
      "message": "Chứng minh nhân dân/căn cước công dân đã tồn tại trong hệ thống."
    }

    create user success:
    status: 200
    {
	    "message": "Tạo thông tin khách hàng thành công.",
	    "user": {
	        "id": 1,
	        "fullName": "Trần Tuấn Việt",
	        "address": "227 Nguyễn Văn Cừ, Quận 5",
	        "phoneNumber": "0328839559",
	        "identityType": "Chứng minh nhân dân",
	        "identityId": "219218210",
	        "updatedAt": "2020-03-16T11:25:41.252Z",
	        "createdAt": "2020-03-16T11:25:41.252Z",
	        "deletedAt": null
	    }
	}


```
* DELETE USER

```
Url: /api/users

  Methob: DELETE 

  Body: 
  {
    userId: number
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

    identity id is not valid: 
    status: 400
    {
      "message": "Chứng minh nhân dân/căn cước công dân không hợp lệ.",
      "user": {}
    }

    use not found:
    status: 404
    {
      "message": "Thông tin khách hàng không tồn tại."
    }

    delete user success:
    status: 200
    {
      "message": "Xóa thông tin khách hàng thành công.",
    }


```

* UPDATE USER

```
Url: /api/users

  Methob: PUT 

  Body: 
  {
    userId: number
    fullName?: String,
    address?: String,
    phoneNumber?: String,
    identityId?: String
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

    user not found: 
    status: 400
    {
      "message": "Thông tin khách hàng không tồn tại.",
      "user": {}
    }

    create user success:
    status: 200
    {
      "message": "Cập nhật thành công.",
      "user": {
          "id": 5,
          "fullName": "Trần Tuấn Văn",
          "address": "78, Nguyễn Văn Trỗi",
          "phoneNumber": "0328839669",
          "identityId": "219218291213",
          "identityType": "Căn cước công dân",
          "createdAt": "2020-03-17T07:48:52.555Z",
          "updatedAt": "2020-03-17T07:49:18.986Z",
          "deletedAt": null
      }
  }


```

* GET LIST USERS

```
Url: /api/users

  Methob: GET 

  query params: 
  {
    name?: string
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
   
    get list users success:
    status: 200
    {
      "message": "Lấy danh sách khách hàng thành công.",
      "users": [
        {
          "id": 2,
          "fullName": "Trần Tuấn Việt",
          "address": "227 Nguyễn Văn Cừ, Quận 5",
          "phoneNumber": "0328839556",
          "identityId": "219218213",
          "identityType": "Chứng minh nhân dân",
          "createdAt": "2020-04-12T15:27:52.665Z",
          "updatedAt": "2020-04-12T15:27:52.665Z",
          "deletedAt": null
        },
      {
        "id": 1,
        "fullName": "Trần Tuấn Việt",
        "address": "227 Nguyễn Văn Cừ, Quận 5",
        "phoneNumber": "0328839556",
        "identityId": "219218214",
        "identityType": "Chứng minh nhân dân",
        "createdAt": "2020-04-12T15:24:12.645Z",
        "updatedAt": "2020-04-12T15:24:12.645Z",
        "deletedAt": null
      }
    ]
  }

```