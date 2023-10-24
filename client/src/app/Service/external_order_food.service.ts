import { Injectable } from '@angular/core';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Staff } from '../Common/models/staff.model';
import { Bill } from '../Common/models/bill.model';
import { OrderFood } from './order_food.service';


//https://github.com/nploi/cnpm-19hc-group02/blob/master/api/users-order-foods.md

@Injectable()
export class ExternalOrderFoodService {

    constructor(private apiClient: WebApi) { }

    orderFoods(name: string = '', notes: string = '', foods: OrderFood[], paymentType: string): Observable<ExternalOrderFoodResponse> {
        return this.apiClient.post<ExternalOrderFoodResponse>('/api/users-order-foods', {
            name: name,
            notes: notes,
            foods: foods,
            paymentType: paymentType,
        });
    }
}

export interface ExternalOrderFoodResponse {
    message: string;
    info: InfoData;
}

export interface InfoData {
    userOrder: UserOrder;
    usersOrderFoods: UsersOrderFoods;
    bill: Bill;
    staff: Staff;
}

export interface UserOrder {
    id: number;
    userFullName: string;
    createdAt: string;
}

export interface UsersOrderFoods {
    usersOrderFoodsInfo: UsersOrderFoodsInfo[];
    totalFoodsPrice: number;
}

export interface UsersOrderFoodsInfo {
    number: number;
    name: string;
    group: string;
    price: number;
    description: string;
    totalFoodPrice: number;
}