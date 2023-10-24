# MANAGE-ROOM_TYPES API
* GET ROOM TYPES
```

  Url: api/manage/room-types/

  Methob: GET 

  query params: 
  {
    roomType?: string ([TWO_BEDS, ONE_BED, THREE_BEDS]);
    view?: string([Biển, Hồ bơi, Phố]);
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

    get room types success:
    status: 200
    {
      "message": "Lấy danh sách loại phòng thành công.",
      "roomTypes": [
        {
            "id": 1,
            "code": "ONE_BED",
            "view": "Biển",
            "name": "Một giường ngủ",
            "numOfBeds": 1,
            "price": 200000,
            "createdAt": "2020-03-30T14:13:33.478Z",
            "updatedAt": "2020-03-30T14:13:33.478Z",
            "deletedAt": null
        }
      ]
    }

```

* UPDATE PRICE
```

  Url: api/manage/room-types/price

  Methob: PUT 

  query params: 
  {
    roomTypeId: number,
    price: number
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

    room type not found: 
    status: 404
    {
      "message": "Không tìm thấy thông tin loại phòng."
    }

    get room types success:
    status: 200
    {
      "message": "Cập nhật thành công.",
      "roomType": {
        "id": 1,
        "code": "ONE_BED",
        "view": "Biển",
        "name": "Một giường ngủ",
        "numOfBeds": 1,
        "price": 400000,
        "createdAt": "2020-03-30T14:13:33.478Z",
        "updatedAt": "2020-04-02T06:00:28.764Z",
        "deletedAt": null,
        "oldPrice": 200000
      }
    }

```

* CREATE ROOM TYPE
```

  Url: api/manage/room-types/

  Methob: POST 

  query params: 
  {
    roomType: string ([TWO_BEDS, ONE_BED, THREE_BEDS]);
    view: string([Biển, Hồ bơi, Phố]);
    price: number
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

    room type exists: 
    status: 404
    {
      "message": "Loại phòng này đã tồn tại."
    }

    create room types success:
    status: 200
    {
      "message": "Cập nhật thành công.",
      "roomType": {
        "id": 4,
        "code": "ONE_BED",
        "name": "Một giường ngủ",
        "numOfBeds": 1,
        "price": 50000,
        "view": "Phố",
        "updatedAt": "2020-04-02T08:57:10.361Z",
        "createdAt": "2020-04-02T08:57:10.361Z",
        "deletedAt": null
      }
    }

```