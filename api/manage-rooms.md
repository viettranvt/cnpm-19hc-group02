# MANAGE-ROOMS API
* CREATE ROOMS
```

  Url: api/manage/rooms/

  Methob: POST 

  Body: 
  {
    roomTypeId: number,
    code: string
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

    code exists:
    status: 400
    {
      "message": "Mã phòng đã tồn tại."
    }

    room type not found: 
    status: 404
    {
      "message": "Loại phòng không hợp lệ."
    }

    create rooms success:
    status: 200
    {
      "message": "Tạo phòng thành công.",
      "room": {
        "id": 14,
        "code": "014",
        "typeId": 1,
        "isBooked": false,
        "updatedAt": "2020-04-03T06:23:19.050Z",
        "createdAt": "2020-04-03T06:23:19.050Z",
        "deletedAt": null,
        "roomType": {
          "id": 1,
          "code": "ONE_BED",
          "view": "Biển",
          "name": "Một giường ngủ",
          "numOfBeds": 1,
          "price": 400000,
          "createdAt": "2020-03-30T14:13:33.478Z",
          "updatedAt": "2020-04-02T06:00:28.764Z",
          "deletedAt": null
        }
      }
    }


```

* GET ROOMS

```

  Url: api/manage/staffs/

  Methob: GET 

  query params: 
  {
    roomType?: string ([TWO_BEDS, ONE_BED, THREE_BEDS]);
    view?: string([Biển, Hồ bơi, Phố]);
    isBooked: boolean
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

    get rooms success:
    status: 200
    {
      "message": "Lấy danh sách phòng thành công.",
      "rooms": [{
        "id": 14,
        "code": "014",
        "typeId": 2,
        "isBooked": true,
        "createdAt": "2020-04-03T06:23:19.050Z",
        "updatedAt": "2020-04-03T06:39:03.719Z",
        "deletedAt": null,
        "roomType": {
          "id": 2,
          "code": "TWO_BEDS",
          "view": "Hồ bơi",
          "name": "Hai giường ngủ",
          "numOfBeds": 2,
          "price": 350000,
          "createdAt": "2020-03-30T14:13:33.485Z",
          "updatedAt": "2020-03-30T14:13:33.485Z",
          "deletedAt": null
        }
      }
    ]}

```

* UPDATE ROOM

```

  Url: api/manage/rooms/

  Methob: PUT 

  body: 
  {
    "roomId": number,
    "code"?: string,
    "roomTypeId"?: string,
    "isBooked"?: string
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

    room not found:
    status: 404
    {
      "message": "Không tìm thấy thông tin phòng."
    }

    code exists:
    status: 400
    {
      "message": "Mã phòng đã tồn tại."
    }

    room type not found: 
    status: 404
    {
      "message": "Loại phòng không hợp lệ."
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
      "message": "Cập nhật thông tin phòng thành công.",
      "room": {
        "id": 14,
        "code": "014",
        "typeId": 2,
        "isBooked": true,
        "createdAt": "2020-04-03T06:23:19.050Z",
        "updatedAt": "2020-04-03T06:39:03.719Z",
        "deletedAt": null,
        "roomType": {
          "id": 2,
          "code": "TWO_BEDS",
          "view": "Hồ bơi",
          "name": "Hai giường ngủ",
          "numOfBeds": 2,
          "price": 350000,
          "createdAt": "2020-03-30T14:13:33.485Z",
          "updatedAt": "2020-03-30T14:13:33.485Z",
          "deletedAt": null
        }
      }
    }

```