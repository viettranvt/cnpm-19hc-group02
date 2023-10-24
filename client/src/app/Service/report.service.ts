import { Injectable } from '@angular/core';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Bill } from '../Common/models/bill.model';
import { User } from '../Common/models/user.model';
import { Room } from '../Common/models/room.model';
import { Food } from '../Common/models/food.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ReportsService {

    constructor(private apiClient: WebApi) { }

    getReports(bookingId?: number, startDate?: number, endDate?: number): Observable<ReportsResponse> {
        var params = new HttpParams()
            .set('bookingId', (bookingId !== undefined) ? bookingId.toString() : '')
            .set('startDate', (startDate !== undefined) ? startDate.toString() : '')
            .set('endDate', (endDate !== undefined) ? endDate.toString() : '');
        console.log(params);
        return this.apiClient.get<ReportsResponse>('/api/reports', params);
    }

    getRestaurantReports(startDate?: number, endDate?: number): Observable<RestaurantReportsResponse> {
        var params = new HttpParams()
            .set('startDate', (startDate !== undefined) ? startDate.toString() : '')
            .set('endDate', (endDate !== undefined) ? endDate.toString() : '');
        console.log(params);
        return this.apiClient.get<RestaurantReportsResponse>('/api/reports/restaurant', params);
    }
}

export interface ReportsResponse {
    message: string;
    bookingsData?: (BookingsDataEntity)[] | null;
    totalPrice: number;
}

export interface BookingsDataEntity {
    bookingInfo: BookingInfo;
    bill: Bill;
    user: User;
    room: Room;
    services: Services;
    bookingFoods: BookingFoods;
}

export interface BookingInfo {
    id: number;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
    isCheckOut: boolean;
    createdAt: string;
}

export interface Services {
    servicesInfo?: (ServicesInfoEntity | null)[] | null;
    totalServicesPrice: number;
}

export interface ServicesInfoEntity {
    id: number;
    bookingId: number;
    serviceId: number;
    staffId: number;
    number: number;
    name: string;
    type: string;
    price: number;
    description: string;
    createdAt: string;
    totalServicePrice: number;
}
export interface BookingFoods {
    bookingFoodsInfo?: (BookingFoodsInfoEntity | null)[] | null;
    totalBookingFoodsPrice: number;
}
export interface BookingFoodsInfoEntity {
    id: number;
    staffId: number;
    isConfirmed: boolean;
    createdAt: string;
    foods?: (FoodsEntity)[] | null;
    totalFoodsPrice: number;
}
export interface FoodsEntity {
    number: number;
    food: Food;
    totalFoodPrice: number;
}

export interface RestaurantReportsResponse {
    message: string;
    bookingsData: BookingsDaum[];
    totalPrice: number;
}

export interface BookingsDaum {
    userOrder: UserOrder;
    usersOrderFoods: UsersOrderFoods;
    bill: Bill;
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
