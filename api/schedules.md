# SCHEDULES API
* CREATE SCHEDULE

```
Url: /api/schedules

  Methob: POST 

  Body: 
  {
    staffId: number,
    startDate: number(convert to miliseconds),
    endDate: number(convert to miliseconds),
    notes?: String
  }

  Header:
  {
  	accessToken: string (role manager)
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

    staff not found
    status: 404
    {
    	"message": "Không tìm thấy thông tin nhân viên."
		}

    Start date is affter end date
    status: 400
    {
    	"message": "Ngày bắt đầu nhỏ hơn ngày kết thúc."
		}

    create schedule success:
    status: 200
    {
	    "message": "Tạo lịch làm việc thành công.",
	    "schedule": {
        "id": 3,
        "creatorId": 1,
        "staffId": 3,
        "notes": "",
        "startDate": "2020-03-17T17:00:00.000Z",
        "endDate": "2020-03-19T17:12:35.374Z",
        "updatedAt": "2020-04-18T14:09:15.183Z",
        "createdAt": "2020-04-18T14:09:15.183Z",
        "deletedAt": null,
        "staff": {
          "id": 3,
          "fullName": "RESTAURANT",
          "userName": "RESTAURANT",
          "password": "$2b$10$w9ELjb3dYZvNW0gixjNvR.waAQd2cn7jaepirEO9j5SR/rUN/.8Wq",
          "email": "resrtaurant@gmail.com",
          "phoneNumber": "0328889999",
          "permissionId": 1,
          "createdAt": "2020-04-15T02:32:00.571Z",
          "updatedAt": "2020-04-15T02:32:00.571Z",
          "deletedAt": null,
          "permission": {
            "id": 1,
            "name": "Nhà hàng",
            "code": "RESTAURANT",
            "createdAt": "2020-04-15T02:31:57.360Z",
            "updatedAt": "2020-04-15T02:31:57.360Z",
            "deletedAt": null
          }
        },
        "creator": {
          "id": 1,
          "fullName": "MANAGEMENT",
          "userName": "MANAGEMENT",
          "password": "$2b$10$tJx0MkauxYCoFlYf8yGoL.NDAVmXPZlawC7cy6fDhOlCoIniUmFWW",
          "email": "management@gmail.com",
          "phoneNumber": "0328881111",
          "permissionId": 3,
          "createdAt": "2020-04-15T02:32:00.567Z",
          "updatedAt": "2020-04-15T02:32:00.567Z",
          "deletedAt": null
        }
	    }
		}


```

* GET SCHEDULES

```
Url: /api/schedules

  Methob: GET 

  query params: 
  {
    staffId?: number(role manager only),
  }

  Header:
  {
  	accessToken: string (role manager)
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

    get schedules success:
    status: 200
 		{
	    "message": "Lấy thông tin lịch làm việc thành công.",
	    "schedules": [
      {
        "id": 1,
        "creatorId": 1,
        "staffId": 2,
        "notes": "",
        "startDate": "2020-03-17T17:00:00.000Z",
        "endDate": "2020-03-19T17:12:35.374Z",
        "createdAt": "2020-04-18T14:05:38.656Z",
        "updatedAt": "2020-04-18T14:05:38.656Z",
        "deletedAt": null,
        "staff": {
          "id": 2,
          "fullName": "RECEPTIONIST",
          "userName": "RECEPTIONIST",
          "password": "$2b$10$U2T.AfVLU53iaxShCfpl0OeL6MMQsGr8Y5.5ep32ohAiqvUohi22G",
          "email": "receptionist@gmail.com",
          "phoneNumber": "0328882222",
          "permissionId": 2,
          "createdAt": "2020-04-15T02:32:00.569Z",
          "updatedAt": "2020-04-15T02:32:00.569Z",
          "deletedAt": null
        },
        "creator": {
          "id": 1,
          "fullName": "MANAGEMENT",
          "userName": "MANAGEMENT",
          "password": "$2b$10$tJx0MkauxYCoFlYf8yGoL.NDAVmXPZlawC7cy6fDhOlCoIniUmFWW",
          "email": "management@gmail.com",
          "phoneNumber": "0328881111",
          "permissionId": 3,
          "createdAt": "2020-04-15T02:32:00.567Z",
          "updatedAt": "2020-04-15T02:32:00.567Z",
          "deletedAt": null
        }
      }]
		}

```

* UPDATE SCHEDULE

```
Url: /api/schedules

  Methob: PUT

  query params: 
  {
    scheduleId: number,
    startDate?: number(convert to miliseconds),
    endDate?: number(convert to miliseconds),
    notes?: string,
  }

  Header:
  {
  	accessToken: string (role manager)
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

    schedule not found: 
    status: 404
    {
       "message": "Không tìm thấy thông tin lịch làm việc."
    }

    start date is affter end date
    status: 400
    {
    	"message": "Ngày bắt đầu nhỏ hơn ngày kết thúc."
		}

    update schedules success:
    status: 200
 		{
	    "message": "Cập nhật lịch làm việc thành công.",
	    "schedule": {
        "id": 3,
        "creatorId": 1,
        "staffId": 3,
        "notes": "",
        "startDate": "2020-04-18T15:36:22.330Z",
        "endDate": "2020-05-16T14:05:55.374Z",
        "createdAt": "2020-04-18T14:09:15.183Z",
        "updatedAt": "2020-04-18T15:37:33.668Z",
        "deletedAt": null,
        "staff": {
          "id": 3,
          "fullName": "RESTAURANT",
          "userName": "RESTAURANT",
          "password": "$2b$10$w9ELjb3dYZvNW0gixjNvR.waAQd2cn7jaepirEO9j5SR/rUN/.8Wq",
          "email": "resrtaurant@gmail.com",
          "phoneNumber": "0328889999",
          "permissionId": 1,
          "createdAt": "2020-04-15T02:32:00.571Z",
          "updatedAt": "2020-04-15T02:32:00.571Z",
          "deletedAt": null
        },
        "creator": {
          "id": 1,
          "fullName": "MANAGEMENT",
          "userName": "MANAGEMENT",
          "password": "$2b$10$tJx0MkauxYCoFlYf8yGoL.NDAVmXPZlawC7cy6fDhOlCoIniUmFWW",
          "email": "management@gmail.com",
          "phoneNumber": "0328881111",
          "permissionId": 3,
          "createdAt": "2020-04-15T02:32:00.567Z",
          "updatedAt": "2020-04-15T02:32:00.567Z",
          "deletedAt": null
        }
	    }
		}

```