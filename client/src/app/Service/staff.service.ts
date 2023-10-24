import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../Common/models/staff.model';
import { WebApi } from '../Common/web-api-action';
import { HttpParams } from '@angular/common/http';
import { Permission } from '../Common/models/permission.model';


@Injectable()
export class StaffService {
    private url: string = '/api/staffs';

    constructor(private apiClient: WebApi) { }

    register(staff: Staff): Observable<StaffCreateResponse> {
        return this.apiClient.post<StaffCreateResponse>('api/manage/staffs', staff);
    }

    login(userName: string, password: string): Observable<LoginResponse> {
        return this.apiClient.post(this.url + '/login', {
            userName: userName,
            password: password
        }, false);
    }

    update(staff: Staff): Observable<StaffUpdateResponse> {
        return this.apiClient.put<StaffUpdateResponse>('api/manage/staffs', staff);
    }

    resetPassword(staffId: number): Observable<StaffResetPasswordResponse> {
        return this.apiClient.put<StaffResetPasswordResponse>('api/manage/staffs/reset-password', {
            staffId: staffId
        });
    }

    changePassword(oldPassword: string, password: string, confirmedPassword: string): Observable<any> {
        // var params = new HttpParams()
        //     .set('oldPassword', oldPassword)
        //     .set('password', password)
        //     .set('confirmedPassword', confirmedPassword);
        // console.log(params);
        return this.apiClient.put<StaffResetPasswordResponse>('/api/staffs/password', {
            oldPassword,
            password,
            confirmedPassword
        });
    }

    getAllStaffs(permisson: Permission): Observable<StaffsResponse> {
        var params = new HttpParams()
            .set('permisson', permisson.code);
        return this.apiClient.get<StaffsResponse>('api/manage/staffs');
    }
}


export class StaffsResponse {
    message?: string;
    staffs?: Staff[];
}

export class LoginResponse {
    message?: string;
    staff?: Staff;
}

export class StaffCreateResponse {
    message?: string;
    staff?: Staff;
}


export class StaffUpdateResponse {
    message?: string;
    staff?: Staff;
}

export class StaffResetPasswordResponse {
    message?: string;
}
