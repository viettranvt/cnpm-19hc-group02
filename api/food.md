# FOODS API


### Get list food
```
Url: /api/foods

  Methob: GET 

  Header:
  {
  	accessToken: string
  } 

  Result:
   {
    "message": "",
    "foods": [
        {
            "id": 1,
            "name": "Bồ câu tiềm bí đỏ",
            "group": "Món nước",
            "price": 250000,
            "description": "Đây là món ăn kết hợp hài hòa giữa 2 loại thực phẩm rất bổ dưỡng là bồ câu và bí đỏ. Đây không chỉ là món ăn mà còn là bài thuốc quý bổ sung dinh dưỡng cho cơ thể.",
            "createdAt": "2020-03-16T11:23:27.105Z",
            "updatedAt": "2020-03-16T11:23:27.105Z",
            "deletedAt": null
        },
        {
            "id": 2,
            "name": "Bánh chưng",
            "group": "Món Khô",
            "price": 100000,
            "description": "Ngày Tết Việt Nam sẽ không còn ý vị nếu thiếu đi chiếc bánh chưng. Bánh hình vuông tượng trưng cho mặt đất nơi chúng ta sinh sống. Trải qua nhiều thế kỷ với bao thăng trầm, biến động, chiếc bánh chưng xanh vẫn bên câu đối đỏ và là một tín hiệu quen thuộc khi Tết về.",
            "createdAt": "2020-03-16T11:23:27.110Z",
            "updatedAt": "2020-03-16T11:23:27.110Z",
            "deletedAt": null
        },
    ]
}
```