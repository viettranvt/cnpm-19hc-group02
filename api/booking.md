# BOOKINGS API
* CREATE BOOKING

```
  Url: /api/bookings

  Methob: POST 

  Body: 
  {
    userId: number,
    roomId: number,
    startDate: number(convert to milliseconds),
    endDate: number(convert to milliseconds),
    description?: string
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

    room not found: 
    status: 404
    {
      "message": "Không tìm thấy thông tin phòng.",
    }

    use not found:
    status: 404
    {
      "message": "Thông tin khách hàng không tồn tại."
    }

    room was booked:
    status: 400
    {
	    "message": "Phòng đã có người đặt"
	  }

    Start date is affter end date:
    status: 400
    {
      "message": "Ngày bắt đầu nhỏ hơn ngày kết thúc."
    }

    create booking success:
    status: 200
    {
      "message": "Đặt phòng thành công.",
	    "booking": {
        "id": 1,
        "roomId": 2,
        "userId": 1,
        "staffId": 2,
        "price": 1050000,
        "description": "",
        "isCheckOut": false,
        "startDate": "2020-03-17T17:00:00.000Z",
        "endDate": "2020-03-19T17:12:35.374Z",
        "updatedAt": "2020-03-19T17:13:58.417Z",
        "createdAt": "2020-03-19T17:13:58.417Z",
        "deletedAt": null
	    }
    }

```

* GET BOOKINGS

```
  Url: /api/bookings

  Methob: GET 

  query params: 
  {
    isPayment?: boolean
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

    get bookings success:
    status: 200
    {
    "message": "Lấy danh sách thông tin đặt phòng thành công.",
    "bookings": [{
      "id": 8,
      "roomId": 1,
      "userId": 1,
      "staffId": 1,
      "price": 1050000,
      "description": "",
      "isCheckOut": false,
      "startDate": "2020-03-17T17:00:00.000Z",
      "endDate": "2020-03-19T17:12:35.374Z",
      "createdAt": "2020-03-28T15:52:06.126Z",
      "updatedAt": "2020-03-28T15:52:06.126Z",
      "deletedAt": null,
      "room": {
        "id": 1,
        "code": "002",
        "typeId": 1,
        "isBooked": true,
        "createdAt": "2020-03-26T15:36:55.608Z",
        "updatedAt": "2020-03-28T15:52:06.296Z",
        "deletedAt": null,
        "roomType": {
          "id": 1,
          "code": "TWO_BEDS",
          "name": "Hai giường ngủ",
          "numOfBeds": 2,
          "price": 350000,
          "createdAt": "2020-03-26T15:36:54.006Z",
          "updatedAt": "2020-03-26T15:36:54.006Z",
          "deletedAt": null
        }
      },
      "user": {
        "id": 1,
        "fullName": "Trần Tuấn Việt",
        "address": "227 Nguyễn Văn Cừ, Quận 5",
        "phoneNumber": "0328839556",
        "identityId": "219218214",
        "identityType": "Chứng minh nhân dân",
        "createdAt": "2020-03-28T14:01:08.761Z",
        "updatedAt": "2020-03-28T14:01:08.761Z",
        "deletedAt": null
      }
    }]
	}

```