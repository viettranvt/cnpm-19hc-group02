import { Injectable } from '@angular/core';
import { Food } from '../Common/models/food.model';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Permission } from '../Common/models/permission.model';

@Injectable()
export class PermissionService {

    constructor(private apiClient: WebApi) { }

    getAllPermissions(): Observable<PermissionsResponse> {
        return this.apiClient.get<PermissionsResponse>('/api/manage/permissions');
    }
}

class PermissionsResponse {
    message?: string;
    permissions?: Permission[];
}
