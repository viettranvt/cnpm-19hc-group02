# REPORT API:

* GET REPORT"

```

  Url: api/reports/

  Methob: GET 

  Body: 
  {
    bookingId?: number,
    startDate?: number (convert to miliseconds),
    endDate?: number (convert to miliseconds)
  }

  Header:
  {
    accessToken: string(manager)
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

    Start date is affter end date: 
    status: 400
    {
      "message": "Ngày bắt đầu nhỏ hơn ngày kết thúc."
    }

    Empty report:
    status: 400
    {
      "message": "Danh sách trống."
    }

    Get report:
    status: 200
    {
    "message": "Lấy thống kê thành công.",
    "bookingsData": [
        {
            "bookingInfo": {
                "id": 5,
                "price": 600000,
                "description": "",
                "startDate": "2020-03-17T17:00:00.000Z",
                "endDate": "2020-03-19T17:12:35.374Z",
                "isCheckOut": true,
                "createdAt": "2020-07-02T13:56:09.539Z"
            },
            "bill": {
                "id": 5,
                "bookingId": 5,
                "amount": 1950000,
                "notes": null,
                "paymentType": "Tiền mặt",
                "paymentDate": "2020-07-02T13:58:07.947Z",
                "isPayment": true,
                "createdAt": "2020-07-02T13:58:07.949Z",
                "updatedAt": "2020-07-02T13:58:07.949Z",
                "deletedAt": null
            },
            "user": {
                "fullName": "Trần Tuấn A",
                "address": "227 Nguyễn Văn Cừ, Quận 5",
                "phoneNumber": "0328839558",
                "identityId": "219218295",
                "identityType": "Chứng minh nhân dân"
            },
            "room": {
                "code": "004",
                "isBooked": false,
                "view": "Biển",
                "name": "Một giường ngủ",
                "numOfBeds": 1,
                "price": 200000
            },
            "services": {
                "servicesInfo": [
                    {
                        "id": 1,
                        "bookingId": 5,
                        "serviceId": 1,
                        "staffId": 3,
                        "number": 2,
                        "name": "Truy cập wifi",
                        "type": "Khác",
                        "price": 50000,
                        "description": "Bạn sẽ được phép truy cập vào wifi của khách sạn với thời hạn là 24 tiếng. Hết 24 tiếng, hệ thống sẽ tự ngắt truy cập.",
                        "createdAt": "2020-07-02T12:57:35.073Z",
                        "totalServicePrice": 100000
                    },
                    {
                        "id": 1,
                        "bookingId": 5,
                        "serviceId": 1,
                        "staffId": 3,
                        "number": 2,
                        "name": "Truy cập wifi",
                        "type": "Khác",
                        "price": 50000,
                        "description": "Bạn sẽ được phép truy cập vào wifi của khách sạn với thời hạn là 24 tiếng. Hết 24 tiếng, hệ thống sẽ tự ngắt truy cập.",
                        "createdAt": "2020-07-02T12:57:35.073Z",
                        "totalServicePrice": 100000
                    }
                ],
                "totalServicesPrice": 200000
            },
            "bookingFoods": {
                "bookingFoodsInfo": [
                    {
                        "id": 2,
                        "staffId": 3,
                        "isConfirmed": true,
                        "createdAt": "2020-07-02T13:57:30.773Z",
                        "foods": [
                            {
                                "number": 2,
                                "food": {
                                    "name": "Bồ câu tiềm bí đỏ",
                                    "group": "Món nước",
                                    "price": 250000,
                                    "description": "Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.",
                                    "number": 2
                                },
                                "totalFoodPrice": 500000
                            },
                            {
                                "number": 3,
                                "food": {
                                    "name": "Phở",
                                    "group": "Món nước",
                                    "price": 50000,
                                    "description": "Một trong những món ăn truyền thống Việt Nam nổi tiếng trên toàn thế giới đó là phở. Thành phần của phở gồm bánh phở được làm từ gạo, nước dùng đậm đà vị ngọt của xương ninh nhừ và gia vị, bên trên tô phở là thịt bò hoặc gà thái mỏng cùng các loại rau thơm, gia vị như: tương, tiêu, chanh, nước mắm, ớt…",
                                    "number": 3
                                },
                                "totalFoodPrice": 150000
                            }
                        ],
                        "totalFoodsPrice": 650000
                    },
                    {
                        "id": 3,
                        "staffId": 3,
                        "isConfirmed": true,
                        "createdAt": "2020-07-02T13:57:41.632Z",
                        "foods": [
                            {
                                "number": 2,
                                "food": {
                                    "name": "Bánh chưng",
                                    "group": "Món khô",
                                    "price": 100000,
                                    "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.",
                                    "number": 2
                                },
                                "totalFoodPrice": 200000
                            },
                            {
                                "number": 3,
                                "food": {
                                    "name": "Cao lầu",
                                    "group": "Món khô",
                                    "price": 100000,
                                    "description": "Cao lầu là món ăn nổi tiếng và góp phần tạo nên cái hồn ẩm thực của phố cổ Hội An. Món cao lầu được cho là xuất hiện ở Hội An từ thế kỷ 17. Đi cùng năm tháng, cao lầu vẫn giữ trọn vẹn hương vị, chinh phục thực khách từ Âu sang Á. Cao lầu có sợi mì màu vàng dùng với tôm, thịt heo, các loại rau sống và chan ít nước.",
                                    "number": 3
                                },
                                "totalFoodPrice": 300000
                            }
                        ],
                        "totalFoodsPrice": 500000
                    }
                ],
                "totalBookingFoodsPrice": 1150000
            }
        },
        {
            "bookingInfo": {
                "id": 2,
                "price": 1000000,
                "description": "",
                "startDate": "2020-07-02T13:10:42.442Z",
                "endDate": "2020-07-03T13:10:42.443Z",
                "isCheckOut": true,
                "createdAt": "2020-07-02T13:10:52.351Z"
            },
            "bill": {
                "id": 2,
                "bookingId": 2,
                "amount": 1000000,
                "notes": "Đã thanh toán",
                "paymentType": "Tiền mặt",
                "paymentDate": "2020-07-02T13:11:40.464Z",
                "isPayment": true,
                "createdAt": "2020-07-02T13:11:00.545Z",
                "updatedAt": "2020-07-02T13:11:40.467Z",
                "deletedAt": null
            },
            "user": {
                "fullName": "Trần Tuấn Việt",
                "address": "78 Nguyễn Văn Trỗi",
                "phoneNumber": "0328839669",
                "identityId": "219218210",
                "identityType": "Chứng minh nhân dân"
            },
            "room": {
                "code": "003",
                "isBooked": false,
                "view": "Phố",
                "name": "Ba giường ngủ",
                "numOfBeds": 3,
                "price": 500000
            },
            "services": {
                "servicesInfo": [],
                "totalServicesPrice": 0
            },
            "bookingFoods": {
                "bookingFoodsInfo": [],
                "totalBookingFoodsPrice": 0
            }
        },
        {
            "bookingInfo": {
                "id": 1,
                "price": 200000,
                "description": "",
                "startDate": "2020-07-02T13:05:36.318Z",
                "endDate": "2020-07-02T13:05:36.318Z",
                "isCheckOut": true,
                "createdAt": "2020-07-02T13:05:38.810Z"
            },
            "bill": {
                "id": 1,
                "bookingId": 1,
                "amount": 500000,
                "notes": "Đã thanh toán",
                "paymentType": "Tiền mặt",
                "paymentDate": "2020-07-02T13:07:52.166Z",
                "isPayment": true,
                "createdAt": "2020-07-02T13:05:51.171Z",
                "updatedAt": "2020-07-02T13:07:52.169Z",
                "deletedAt": null
            },
            "user": {
                "fullName": "Trần Tuấn Việt",
                "address": "78 Nguyễn Văn Trỗi",
                "phoneNumber": "0328839669",
                "identityId": "219218210",
                "identityType": "Chứng minh nhân dân"
            },
            "room": {
                "code": "001",
                "isBooked": false,
                "view": "Biển",
                "name": "Một giường ngủ",
                "numOfBeds": 1,
                "price": 200000
            },
            "services": {
                "servicesInfo": [],
                "totalServicesPrice": 0
            },
            "bookingFoods": {
                "bookingFoodsInfo": [
                    {
                        "id": 1,
                        "staffId": 2,
                        "isConfirmed": true,
                        "createdAt": "2020-07-02T13:06:54.042Z",
                        "foods": [
                            {
                                "number": 1,
                                "food": {
                                    "name": "Bồ câu tiềm bí đỏ",
                                    "group": "Món nước",
                                    "price": 250000,
                                    "description": "Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.",
                                    "number": 1
                                },
                                "totalFoodPrice": 250000
                            },
                            {
                                "number": 1,
                                "food": {
                                    "name": "Phở",
                                    "group": "Món nước",
                                    "price": 50000,
                                    "description": "Một trong những món ăn truyền thống Việt Nam nổi tiếng trên toàn thế giới đó là phở. Thành phần của phở gồm bánh phở được làm từ gạo, nước dùng đậm đà vị ngọt của xương ninh nhừ và gia vị, bên trên tô phở là thịt bò hoặc gà thái mỏng cùng các loại rau thơm, gia vị như: tương, tiêu, chanh, nước mắm, ớt…",
                                    "number": 1
                                },
                                "totalFoodPrice": 50000
                            }
                        ],
                        "totalFoodsPrice": 300000
                    }
                ],
                "totalBookingFoodsPrice": 300000
            }
        }
    ],
    "totalPrice": 3450000
	}
}

```

* GET REPORT FOR RESTAURANT"

```

  Url: api/reports/restaurant

  Methob: GET 

  Body: 
  {
    startDate?: number (convert to miliseconds),
    endDate?: number (convert to miliseconds)
  }

  Header:
  {
    accessToken: string(manager)
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

    Start date is affter end date: 
    status: 400
    {
      "message": "Ngày bắt đầu nhỏ hơn ngày kết thúc."
    }

    Empty report:
    status: 400
    {
      "message": "Danh sách trống."
    }

    Get report:
    status: 200
    {
		    "message": "Lấy thống kê thành công.",
		    "bookingsData": [
		        {
		            "userOrder": {
		                "id": 2,
		                "userFullName": "",
		                "createdAt": "2020-07-03T16:03:29.828Z"
		            },
		            "usersOrderFoods": {
		                "usersOrderFoodsInfo": [
		                    {
		                        "number": 1,
		                        "name": "Bánh chưng",
		                        "group": "Món khô",
		                        "price": 100000,
		                        "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.",
		                        "totalFoodPrice": 100000
		                    },
		                    {
		                        "number": 2,
		                        "name": "Cao lầu",
		                        "group": "Món khô",
		                        "price": 100000,
		                        "description": "Cao lầu là món ăn nổi tiếng và góp phần tạo nên cái hồn ẩm thực của phố cổ Hội An. Món cao lầu được cho là xuất hiện ở Hội An từ thế kỷ 17. Đi cùng năm tháng, cao lầu vẫn giữ trọn vẹn hương vị, chinh phục thực khách từ Âu sang Á. Cao lầu có sợi mì màu vàng dùng với tôm, thịt heo, các loại rau sống và chan ít nước.",
		                        "totalFoodPrice": 200000
		                    }
		                ],
		                "totalFoodsPrice": 300000
		            },
		            "bill": {
		                "id": 2,
		                "usersOrderId": 2,
		                "notes": "",
		                "amount": 300000,
		                "paymentType": "Tiền mặt",
		                "paymentDate": "2020-07-03T16:03:29.865Z",
		                "createdAt": "2020-07-03T16:03:29.866Z",
		                "updatedAt": "2020-07-03T16:03:29.866Z",
		                "deletedAt": null
		            }
		        },
		        {
		            "userOrder": {
		                "id": 1,
		                "userFullName": "",
		                "createdAt": "2020-07-03T15:41:38.734Z"
		            },
		            "usersOrderFoods": {
		                "usersOrderFoodsInfo": [
		                    {
		                        "number": 1,
		                        "name": "Bồ câu tiềm bí đỏ",
		                        "group": "Món nước",
		                        "price": 250000,
		                        "description": "Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.",
		                        "totalFoodPrice": 250000
		                    },
		                    {
		                        "number": 2,
		                        "name": "Phở",
		                        "group": "Món nước",
		                        "price": 50000,
		                        "description": "Một trong những món ăn truyền thống Việt Nam nổi tiếng trên toàn thế giới đó là phở. Thành phần của phở gồm bánh phở được làm từ gạo, nước dùng đậm đà vị ngọt của xương ninh nhừ và gia vị, bên trên tô phở là thịt bò hoặc gà thái mỏng cùng các loại rau thơm, gia vị như: tương, tiêu, chanh, nước mắm, ớt…",
		                        "totalFoodPrice": 100000
		                    }
		                ],
		                "totalFoodsPrice": 350000
		            },
		            "bill": {
		                "id": 1,
		                "usersOrderId": 1,
		                "notes": "",
		                "amount": 350000,
		                "paymentType": "Tiền mặt",
		                "paymentDate": "2020-07-03T15:41:38.849Z",
		                "createdAt": "2020-07-03T15:41:38.849Z",
		                "updatedAt": "2020-07-03T15:41:38.849Z",
		                "deletedAt": null
		            }
		        }
		    ],
		    "totalPrice": 650000
		}
    

```