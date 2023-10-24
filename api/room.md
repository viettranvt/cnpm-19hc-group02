# ROOMS API

## Get list room

```
Url: /api/rooms

  Methob: GET 

  Header:
  {
  	accessToken: string
  }

  query pamrams: {
  	isBooked?: boolean,
  	roomType?: string ['ONE_BED', 'TWO_BEDS', 'THREE_BEDS']
  }

  Result:

{
    "message": "",
    "rooms": [
        {
            "id": 1,
            "code": "004",
            "typeId": 2,
            "isBooked": false,
            "createdAt": "2020-03-19T16:28:46.591Z",
            "updatedAt": "2020-03-19T16:28:46.591Z",
            "deletedAt": null,
            "type": {
                "id": 2,
                "code": "ONE_BED",
                "name": "Một giường ngủ",
                "numOfBeds": 1,
                "price": 200000,
                "createdAt": "2020-03-19T16:28:46.170Z",
                "updatedAt": "2020-03-19T16:28:46.170Z",
                "deletedAt": null
            }
        },
        {
            "id": 3,
            "code": "003",
            "typeId": 1,
            "isBooked": false,
            "createdAt": "2020-03-19T16:28:46.596Z",
            "updatedAt": "2020-03-19T16:28:46.596Z",
            "deletedAt": null,
            "type": {
                "id": 1,
                "code": "THREE_BEDS",
                "name": "Ba giường ngủ",
                "numOfBeds": 3,
                "price": 500000,
                "createdAt": "2020-03-19T16:28:46.163Z",
                "updatedAt": "2020-03-19T16:28:46.163Z",
                "deletedAt": null
            }
        }
    ]
}
```