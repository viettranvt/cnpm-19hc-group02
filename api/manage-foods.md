# MANAGE-FOODS API

* GET FOODS:
```

  Url: api/manage/foods/

  Methob: GET 

  query params: 
  {
    group: string (["Cơm", "Món nước", "Món khô", "Đồ uống", "Gỏi", "Bánh"])
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

    get foods success:
    status: 200
    {
      "message": "Lấy danh sách đồ ăn thành công.",
      "foods": [
        {
          "id": 7,
          "name": "Cơm tấm",
          "group": "Cơm",
          "price": 35000,
          "description": "Cơm tấm có thể gồm cả sườn, bì, chả, trứng hoặc không gồm đầy đủ các món trên nhưng phải có nước mắm ngọt.",
          "createdAt": "2020-03-30T14:13:34.367Z",
          "updatedAt": "2020-03-30T14:13:34.367Z",
          "deletedAt": null
        },
        {
          "id": 10,
          "name": "Cơm hến",
          "group": "Cơm",
          "price": 65000,
          "description": "Cơm nguội trộn với hến luộc, nước hến, mắm ruốc, rau bắp cải, tóp mỡ, bánh tráng nướng, mì xào giòn, ớt màu, đậu phộng nguyên hạt, dầu ăn chín, tiêu và muối.",
          "createdAt": "2020-03-30T14:13:34.387Z",
          "updatedAt": "2020-03-30T14:13:34.387Z",
          "deletedAt": null
        }
      ]
    }

```

* CREATE FOODS:
```

  Url: api/manage/foods/

  Methob: POST 

  query params: 
  {
    group: string (["Cơm", "Món nước", "Món khô", "Đồ uống", "Gỏi", "Bánh"]),
    name: string,
    price: number,
    description: string
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

    food name exist: 
    status: 400
    {
      "message": "Tên Đồ ăn đã tồn tại."
    }

    create foods success:
    status: 200
    {
      "message": "Tạo đồ ăn thành công.",
      "food": {
        "id": 15,
        "group": "Cơm",
        "name": "Bún đậu mắm tôm",
        "price": 50000,
        "description": "Bún lá ăn với đậu chiên, mắm tôm vắt chanh và ớt đánh sủi bọt. Rau sống đi kèm thường có rau kinh giới.",
        "updatedAt": "2020-04-04T07:21:52.792Z",
        "createdAt": "2020-04-04T07:21:52.792Z",
        "deletedAt": null
      }
    }

```

* UPDATE FOODS:
```

  Url: api/manage/foods/

  Methob: PUT 

  query params: 
  {
    foodId: number
    group?: string (["Cơm", "Món nước", "Món khô", "Đồ uống", "Gỏi", "Bánh"]),
    name?: string,
    price?: number,
    description?: string
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

    food not found: 
    status: 404
    {
      "message": "Đồ ăn không tồn tại."
    }

    food name exist: 
    status: 400
    {
      "message": "Tên Đồ ăn đã tồn tại."
    }

    create foods success:
    status: 200
    {
      "message": "Cập nhật đồ ăn thành công.",
      "food": {
        "id": 15,
        "name": "Bún đậu mắm tôm",
        "group": "Món khô",
        "price": 55000,
        "description": "Bún lá ăn với đậu chiên, mắm tôm vắt chanh và ớt đánh sủi bọt. Rau sống đi kèm thường có rau kinh giới.",
        "createdAt": "2020-04-04T07:21:52.792Z",
        "updatedAt": "2020-04-04T13:43:27.739Z",
        "deletedAt": null
      }
    }

```