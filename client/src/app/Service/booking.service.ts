import { Injectable } from '@angular/core';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { User } from '../Common/models/user.model';
import { HttpParams } from '@angular/common/http';
import { Booking } from '../Common/models/booking';

// docs: https://github.com/nploi/cnpm-19hc-group02/blob/master/api/booking.md
@Injectable()
export class BookingService {

    constructor(private apiClient: WebApi) { }

    getBookings(isBooked = false): Observable<BookingsResponse> {
        // var params = new HttpParams()
        //     .set('isBooked', isBooked.toString());
        // console.log(params);
        // return this.apiClient.get<BookingsResponse>('/api/bookings', params);
        return this.apiClient.get<BookingsResponse>('/api/bookings');
    }

    createUser(booking: Booking): Observable<BookingCreateResponse> {
        return this.apiClient.post<BookingCreateResponse>('/api/bookings', booking);
    }
}

class BookingsResponse {
    message?: string;
    bookings?: Booking[];
}

class BookingCreateResponse {
    message?: string;
    booking?: Booking;
}