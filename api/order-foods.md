# ORDERFOODS API
* CREATE ORDERFOODS
```

  Url: api/order-foods/

  Methob: POST 

  Body: 
  {
    bookingId: number,
		foods: [
			{
				foodId: number,
				number: number
			}
		]
  }

  Header:
  {
    accessToken: string(role: Receptionist)
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

    food not found:
    status: 404
    {
      "message": "Không tìm thấy thông tin thức ăn."
    }

    the bills has been paid:
    status: 400
    {
      "message": "Hóa đơn đã được thanh toán."
    }

    create booking foods success:
    status: 200
    {
    "message": "Đặt món thành công.",
    "bookingFood": {
        "bookingFoodInfo": {
            "id": 9,
            "isConfirmed": false,
            "createdAt": "2020-03-28T14:12:27.790Z",
            "foods": [
                {
                    "number": 2,
                    "food": {
                        "name": "Bánh chưng",
                        "group": "Món Khô",
                        "price": 100000,
                        "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về."
                    },
                    "totalFoodPrice": 200000
                },
                {
                    "number": 3,
                    "food": {
                        "name": "Cao lầu",
                        "group": "Món Khô",
                        "price": 100000,
                        "description": "Cao lầu là món ăn nổi tiếng và góp phần tạo nên cái hồn ẩm thực của phố cổ Hội An. Món cao lầu được cho là xuất hiện ở Hội An từ thế kỷ 17. Đi cùng năm tháng, cao lầu vẫn giữ trọn vẹn hương vị, chinh phục thực khách từ Âu sang Á. Cao lầu có sợi mì màu vàng dùng với tôm, thịt heo, các loại rau sống và chan ít nước."
                    },
                    "totalFoodPrice": 300000
                }
            ]
        },
        "totalBookingFoodPrice": 500000
    },
    "staff": {
        "fullName": "RESTAURANT",
        "userName": "RESTAURANT",
        "password": "$2b$10$C8uJzo.QwMtxWU/rbLDAwudl9Yb8Qf7gkSofrnrFx50M0fs4dNPbK",
        "email": "resrtaurant@gmail.com",
        "phoneNumber": "0328889999"
    }
  }
}

```