# USERS ORDER FOODS API
* CREATE USERS ORDER FOODS
```

  Url: /api/users-order-foods/

  Methob: POST 

  Body: 
  {
    name?: string,
    notes?: string,
    foods: [
    {
      foodId: number,
      number: number
    }
    ],
    paymentType: string (['Tiền mặt', 'Thẻ tín dụng', 'Ghi nợ'])
  }

  Header:
  {
    accessToken: string(role: restaurant)
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
    "message": "Không tìm thấy thông tin thức ăn."
  }

  create users order foods success:
  status: 200
  {
    "message": "Đặt món thành công.",
    "info": {
      "userOrder": {
      	"id": 2,
        "userFullName": "",
        "createdAt": "2020-03-26T15:56:08.875Z"
      },
      "usersOrderFoods": {
        "usersOrderFoodsInfo": [
        {
          "number": 3,
          "name": "Cao lầu",
          "group": "Món Khô",
          "price": 100000,
          "description": "Cao lầu là món ăn nổi tiếng và góp phần tạo nên cái hồn ẩm thực của phố cổ Hội An. Món cao lầu được cho là xuất hiện ở Hội An từ thế kỷ 17. Đi cùng năm tháng, cao lầu vẫn giữ trọn vẹn hương vị, chinh phục thực khách từ Âu sang Á. Cao lầu có sợi mì màu vàng dùng với tôm, thịt heo, các loại rau sống và chan ít nước.",
          "totalFoodPrice": 300000
          },
          {
            "number": 2,
            "name": "Bánh chưng",
            "group": "Món Khô",
            "price": 100000,
            "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.",
            "totalFoodPrice": 200000
          }],
          "totalFoodsPrice": 500000
      },
      "bill": {
        "id": 6,
        "usersOrderId": 6,
        "notes": "",
        "amount": 500000,
        "paymentType": "Tiền mặt",
        "paymentDate": "2020-03-26T15:56:09.645Z",
        "updatedAt": "2020-03-26T15:56:09.646Z",
        "createdAt": "2020-03-26T15:56:09.646Z",
        "deletedAt": null
        },
        "staff": {
          "fullName": "RESTAURANT",
          "userName": "RESTAURANT",
          "email": "resrtaurant@gmail.com",
          "phoneNumber": "0328889999"
        }
      }
    }
  }

```