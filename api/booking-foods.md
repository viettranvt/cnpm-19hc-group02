# BOOKINGS FOODS API
* GET BOOKINGS FOODS

```
  Url: /api/booking-foods

  Methob: GET 

  query params: 
  {
    bookingId: number
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

    get booking foods success:
    status: 200
		{
	    "message": "Lấy danh sách hóa đơn thành công.",
	    "bookingFoods": [
	      {
          "id": 1,
          "bookingId": 1,
          "staffId": 3,
          "isConfirmed": true,
          "createdAt": "2020-04-15T02:34:58.990Z",
          "updatedAt": "2020-04-15T02:34:58.990Z",
          "deletedAt": null,
          "orderFoods": [
            {
              "id": 1,
              "bookingFoodsId": 1,
              "foodId": 1,
              "number": 2,
              "createdAt": "2020-04-15T02:34:59.339Z",
              "updatedAt": "2020-04-15T02:34:59.339Z",
              "deletedAt": null,
              "food": {
                "id": 1,
                "name": "Bồ câu tiềm bí đỏ",
                "group": "Món nước",
                "price": 250000,
                "description": "Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.",
                "createdAt": "2020-04-15T02:32:00.861Z",
                "updatedAt": "2020-04-15T02:32:00.861Z",
                "deletedAt": null
              },
              "totalFoodPrice": 500000
            },
            {
              "id": 2,
              "bookingFoodsId": 1,
              "foodId": 2,
              "number": 3,
              "createdAt": "2020-04-15T02:34:59.340Z",
              "updatedAt": "2020-04-15T02:34:59.340Z",
              "deletedAt": null,
              "food": {
                "id": 2,
                "name": "Bánh chưng",
                "group": "Món khô",
                "price": 100000,
                "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.",
                "createdAt": "2020-04-15T02:32:00.874Z",
                "updatedAt": "2020-04-15T02:32:00.874Z",
                "deletedAt": null
              },
              "totalFoodPrice": 300000
            }
          ],
          "totalFoodsPrice": 800000
      	},
     		{
          "id": 2,
          "bookingId": 1,
          "staffId": 3,
          "isConfirmed": true,
          "createdAt": "2020-04-15T02:35:09.933Z",
          "updatedAt": "2020-04-15T02:35:09.933Z",
          "deletedAt": null,
          "orderFoods": [
            {
              "id": 3,
              "bookingFoodsId": 2,
              "foodId": 3,
              "number": 2,
              "createdAt": "2020-04-15T02:35:10.330Z",
              "updatedAt": "2020-04-15T02:35:10.330Z",
              "deletedAt": null,
              "food": {
                "id": 3,
                "name": "Phở",
                "group": "Món nước",
                "price": 50000,
                "description": "Một trong những món ăn truyền thống Việt Nam nổi tiếng trên toàn thế giới đó là phở. Thành phần của phở gồm bánh phở được làm từ gạo, nước dùng đậm đà vị ngọt của xương ninh nhừ và gia vị, bên trên tô phở là thịt bò hoặc gà thái mỏng cùng các loại rau thơm, gia vị như: tương, tiêu, chanh, nước mắm, ớt…",
                "createdAt": "2020-04-15T02:32:00.886Z",
                "updatedAt": "2020-04-15T02:32:00.886Z",
                "deletedAt": null
              },
              "totalFoodPrice": 100000
            },
            {
              "id": 4,
              "bookingFoodsId": 2,
              "foodId": 4,
              "number": 3,
              "createdAt": "2020-04-15T02:35:10.331Z",
              "updatedAt": "2020-04-15T02:35:10.331Z",
              "deletedAt": null,
              "food": {
                "id": 4,
                "name": "Cao lầu",
                "group": "Món khô",
                "price": 100000,
                "description": "Cao lầu là món ăn nổi tiếng và góp phần tạo nên cái hồn ẩm thực của phố cổ Hội An. Món cao lầu được cho là xuất hiện ở Hội An từ thế kỷ 17. Đi cùng năm tháng, cao lầu vẫn giữ trọn vẹn hương vị, chinh phục thực khách từ Âu sang Á. Cao lầu có sợi mì màu vàng dùng với tôm, thịt heo, các loại rau sống và chan ít nước.",
                "createdAt": "2020-04-15T02:32:00.903Z",
                "updatedAt": "2020-04-15T02:32:00.903Z",
                "deletedAt": null
              },
              "totalFoodPrice": 300000
            }
          ],
          "totalFoodsPrice": 400000
	      }
    	]
		}

```

* UPDATE CONFIRMED  STATUS

```
  Url: /api/booking-foods/confirmed

  Methob: PUT

  query params: 
  {
    bookingFoodId: number
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

    booking food not found:
    status: 404
    {
       "message": "Không tìm thấy hóa đơn."
    }

    booking food is comfirmed:
    status: 404
    {
       "message": "Hóa đơn đã được xác nhận."
    }

    update confirmed status success:
    status: 200
		{
	    "message": "Xác nhận hóa đơn thành công.",
	    "bookingFood": {
        "id": 1,
        "bookingId": 1,
        "staffId": 3,
        "isConfirmed": true,
        "createdAt": "2020-04-15T02:34:58.990Z",
        "updatedAt": "2020-04-15T03:40:20.762Z",
        "deletedAt": null,
        "orderFoods": [
        {
          "id": 1,
          "bookingFoodsId": 1,
          "foodId": 1,
          "number": 2,
          "createdAt": "2020-04-15T02:34:59.339Z",
          "updatedAt": "2020-04-15T02:34:59.339Z",
          "deletedAt": null,
          "food": {
            "id": 1,
            "name": "Bồ câu tiềm bí đỏ",
            "group": "Món nước",
            "price": 250000,
            "description": "Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.",
            "createdAt": "2020-04-15T02:32:00.861Z",
            "updatedAt": "2020-04-15T02:32:00.861Z",
            "deletedAt": null
          },
          "totalFoodPrice": 500000
        },
        {
          "id": 2,
          "bookingFoodsId": 1,
          "foodId": 2,
          "number": 3,
          "createdAt": "2020-04-15T02:34:59.340Z",
          "updatedAt": "2020-04-15T02:34:59.340Z",
          "deletedAt": null,
          "food": {
            "id": 2,
            "name": "Bánh chưng",
            "group": "Món khô",
            "price": 100000,
            "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.",
            "createdAt": "2020-04-15T02:32:00.874Z",
            "updatedAt": "2020-04-15T02:32:00.874Z",
            "deletedAt": null
          },
          "totalFoodPrice": 300000
        }
        ],
        "totalFoodsPrice": 800000
	    }
		}

```
