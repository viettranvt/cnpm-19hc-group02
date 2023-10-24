import { Injectable } from '@angular/core';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Staff } from '../Common/models/staff.model';
import { HttpParams } from '@angular/common/http';
import { Food } from '../Common/models/food.model';
import { Bill } from '../Common/models/bill.model';
import { User } from '../Common/models/user.model';
import { Room } from '../Common/models/room.model';

@Injectable()
export class PaymentService {

    constructor(private apiClient: WebApi) { }

    pay(bookingId: number, notes: string, paymentType: string): Observable<PayResponse> {
        return this.apiClient.post<PayResponse>('/api/bills', {
            bookingId: bookingId,
            notes: notes,
            paymentType: paymentType
        });
    }

    getBill(bookingId: number): Observable<GetBillResponse> {
        var params = new HttpParams()
            .set('bookingId', bookingId.toString());
        return this.apiClient.get<GetBillResponse>('/api/bills', params);
    }
}

export class GetBillResponse {
    message: string;
    info: Info;
}

export class PayResponse {
    message: string;
    info: Info;
}

export class Info {
    bookingInfo: BookingInfo;
    bill: Bill;
    user: User;
    room: Room;
    services: Services;
    bookingFoods: BookingFoods;
    staff: Staff;
}

export class BookingInfo {
    id: number;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
    isCheckOut: boolean;
    createdAt: string;
}

export class Services {
    servicesInfo?: (ServicesInfoEntity)[] | null;
    totalServicesPrice: number;
}
export class ServicesInfoEntity {
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
export class BookingFoods {
    bookingFoodsInfo?: (BookingFoodsInfoEntity)[] | null;
    totalBookingFoodsPrice: number;
}
export class BookingFoodsInfoEntity {
    id: number;
    staffId: number;
    isConfirmed: boolean;
    createdAt: string;
    foods?: (FoodsEntity)[] | null;
    totalFoodsPrice: number;
}

export class FoodsEntity {
    number: number;
    food: Food;
    totalFoodPrice: number;
}