# MANAGE-SERVICES API

* GET SERVICES:
```

  Url: api/manage/services/

  Methob: GET 

  query params: 
  {
    type: string (["Khác", "Giải trí/Thể thao", "Thư giãn"])
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

    get services success:
    status: 200
    {
	    "messageL": "Lấy danh sách dịch vụ thành công.",
	    "services": [
		    {
			    "id": 2,
			    "name": "Truy cập wifi",
			    "type": "Khác",
			    "price": 50000,
			    "description": "Bạn sẽ được phép truy cập vào wifi của khách sạn với thời hạn là 24 tiếng. Hết 24 tiếng, hệ thống sẽ tự ngắt truy cập.",
			    "createdAt": "2020-04-03T14:26:10.064Z",
			    "updatedAt": "2020-04-03T14:26:10.064Z",
			    "deletedAt": null
		    }
	    ]
		}

```

* UPDATE SERVICES:
```

  Url: api/manage/services/

  Methob: PUT 

  query params: 
  {
  	serviceId: number,
  	description?: string,
  	name?: string,
  	price?: number,
    type?: string (["Khác", "Giải trí/Thể thao", "Thư giãn"])
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

    service not found: 
    status: 404
    {
       "message": "Không tìm thấy dịch vụ."
    }

		name exists:
    status: 400
    {
       "message": "Không tìm thấy dịch vụ."
    }

    update services success:
    status: 200
    {
	    "message": "Cập nhật dịch vụ thành công.",
	    "service": {
        "id": 3,
        "name": "Giặt ủi",
        "type": "Khác",
        "price": 45000,
        "description": "Mỗi ngày sẽ có nhân viên đến lầy đồ của bạn, sau đó sẽ giặt, sấy và ủi đồ cho bạn.",
        "createdAt": "2020-04-03T15:38:21.008Z",
        "updatedAt": "2020-04-03T15:44:05.674Z",
        "deletedAt": null
	    }
		}

```

* CREATE SERVICES:
```

  Url: api/manage/services/

  Methob: POST 

  query params: 
  {
  	description: string,
  	name: string,
  	price: number,
    type: string (["Khác", "Giải trí/Thể thao", "Thư giãn"])
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

		name exists:
    status: 400
    {
       "message": "Tên dịch vụ đã tồn tại.
    }

    create services success:
    status: 200
    {
	    "message": "Tạo dịch vụ thành công.",
	    "service": {
        "id": 3,
        "name": "Giặt đồ",
        "type": "Khác",
        "price": 50000,
        "description": "Mỗi ngày sẽ có nhân viên đến lầy đồ của bạn, sau đó sẽ giặt và sấy đồ cho bạn.",
        "updatedAt": "2020-04-03T15:38:21.008Z",
        "createdAt": "2020-04-03T15:38:21.008Z",
        "deletedAt": null
	    }
		}

```