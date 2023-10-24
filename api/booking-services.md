# BOOKING-SERVICES API:

* CREATE BOOKING SERVICE"

```

  Url: api/booking-services/

  Methob: POST 

  Body: 
  {
    bookingId: number,
    services: [
      {
        serviceId: number,
        number: number    
      }
    ]
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

    booking not found: 
    status: 404
    {
      "message": "Không tìm thấy thông tin đặt phòng."
    }

    service not found:
    status: 404
    {
      "message": "Không tìm thấy dịch vụ."
    }

    the bills has been paid:
    status: 400
    {
      "message": "Hóa đơn đã được thanh toán."
    }

    create booking services success:
    status: 200
    {
      "message": "Thêm dịch vụ thành công.",
      "bookingSerices": {
        "bookingServicesInfo": [
          {
              "number": 2,
              "createdAt": "2020-03-28T15:46:30.890Z",
              "service": {
                  "name": "Truy cập wifi",
                  "type": "WIFI",
                  "price": 50000,
                  "description": "Bạn sẽ được phép truy cập vào wifi của khách sạn với thời hạn là 24 tiếng. Hết 24 tiếng, hệ thống sẽ tự ngắt truy cập."
              },
              "totalServicePrice": 100000
          }
        ],
        "totalBookingServicesPrice": 100000
    },
    "staff": {
      "fullName": "RECEPTIONIST",
      "userName": "RECEPTIONIST",
      "email": "receptionist@gmail.com",
      "phoneNumber": "0328882222"
    }
  }
}

```