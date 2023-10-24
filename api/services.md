# SERVICES API:

* GET SERVICES"

```

  Url: api/services/

  Methob: GET 

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

    get services success:
    status: 200
    {
      "messageL": "Lấy danh sách dịch vụ thành công.",
      "services": [{
        "id": 1,
        "name": "Truy cập wifi",
        "type": "WIFI",
        "price": 50000,
        "description": "Bạn sẽ được phép truy cập vào wifi của khách sạn với thời hạn là 24 tiếng. Hết 24 tiếng, hệ thống sẽ tự ngắt truy cập.",
        "createdAt": "2020-03-26T15:36:52.405Z",
        "updatedAt": "2020-03-26T15:36:52.405Z",
        "deletedAt": null
      }]
    }

```