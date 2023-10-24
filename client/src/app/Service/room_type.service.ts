import { Injectable } from '@angular/core';
import { Food } from '../Common/models/food.model';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Permission } from '../Common/models/permission.model';
import { RoomType } from '../Common/models/room_type.model';

@Injectable()
export class RoomTypeService {

    constructor(private apiClient: WebApi) { }

    getAllPermissions(): Observable<RoomTypesResponse> {
        return this.apiClient.get<RoomTypesResponse>('/api/manage/room-types');
    }
}

class RoomTypesResponse {
    message?: string;
    roomTypes?: RoomType[];
}
