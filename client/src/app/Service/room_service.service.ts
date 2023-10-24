import { Injectable } from '@angular/core';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Service } from '../Common/models/service.model';
import { Staff } from '../Common/models/staff.model';

@Injectable()
export class RoomServiceService {

    constructor(private apiClient: WebApi) { }

    getAllService(): Observable<ServicesResponse> {
        return this.apiClient.get<ServicesResponse>('/api/services');
    }

    bookService(bookingId: number, services: OrderService[]): Observable<BookingServiceResponse> {
        return this.apiClient.post<BookingServiceResponse>('/api/booking-services', {
            bookingId: bookingId,
            services: services,
        });
    }
}

export interface BookingServiceResponse {
    message: string;
    bookingSerices: BookingSerices;
    staff: Staff;
}
export interface BookingSerices {
    bookingServicesInfo?: (BookingServicesInfoEntity)[] | null;
    totalBookingServicesPrice: number;
}
export interface BookingServicesInfoEntity {
    number: number;
    createdAt: string;
    service: Service;
    totalServicePrice: number;
}

export class OrderService {
    serviceId: number;
    number: number;
}

export class ServicesResponse {
    message?: string;
    services?: Service[];
}
