import { Injectable } from '@angular/core';
import { Food } from '../Common/models/food.model';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { User } from '../Common/models/user.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {

    constructor(private apiClient: WebApi) { }

    getUsers(name?: string): Observable<UsersResponse> {
        // var params = new HttpParams()
        //     .set('name', name);
        // console.log(params);
        // return this.apiClient.get<UsersResponse>('/api/users', params);
        return this.apiClient.get<UsersResponse>('/api/users');
    }

    createUser(user: User): Observable<UserCreateResponse> {
        return this.apiClient.post<UserCreateResponse>('/api/users', user);
    }

    deleteUser(userId: number): Observable<UserDeleteResponse> {
        return this.apiClient.delete<UserDeleteResponse>('/api/users', {
            userId: userId
        });
    }

    updateUser(user: any): Observable<UserUpdateResponse> {
        return this.apiClient.put<UserUpdateResponse>('/api/users', user);
    }
}

class UsersResponse {
    message?: string;
    users?: User[];
}

class UserCreateResponse {
    message?: string;
    user?: User;
}

class UserUpdateResponse {
    message?: string;
    user?: User;
}

class UserDeleteResponse {
    message?: string;
}