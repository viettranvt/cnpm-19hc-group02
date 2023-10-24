import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Common/models/room.model';
import { WebApi } from '../Common/web-api-action';
import { HttpParams } from '@angular/common/http';

// Using
// this.roomService.getAllRooms().subscribe(
//   res => console.log(res.rooms),
//   error => console.log(error)
// );

// this.roomService.getRooms('ONE_BED', "Biển", false).subscribe(
//   res => console.log(res.rooms),
//   error => console.log(error)
// );

@Injectable()
export class RoomService {
    constructor(private apiClient: WebApi) { }

    getAllRooms(): Observable<RoomsResponse> {
        return this.apiClient.get<RoomsResponse>(
            '/api/rooms',
        );
    }

    getRooms(roomType: string, view: string, isBooked = false): Observable<any> {
        var params = new HttpParams()
            .set('roomType', roomType)
            .set('view', view)
            .set('isBooked', String(isBooked));
        console.log(params);
        return this.apiClient.get('/api/manage/rooms', params);
    }
}


class RoomsResponse {
    message?: string;
    rooms?: Room[];
}
