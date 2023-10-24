import { Injectable } from '@angular/core';
import { Food } from '../Common/models/food.model';
import { WebApi } from '../Common/web-api-action';
import { Observable } from 'rxjs';
import { Staff } from '../Common/models/staff.model';
import { BookingFood } from '../Common/models/booking_food.model';

@Injectable()
export class OrderFoodService {

    constructor(private apiClient: WebApi) { }

    orderFoods(bookingId: number, foods: OrderFood[]): Observable<OrderFoodResponse> {
        return this.apiClient.post<OrderFoodResponse>('/api/order-foods', {
            bookingId: bookingId,
            foods: foods
        });
    }
}

export class OrderFood {
    foodId: number;
    number: number;
}

export class OrderedFood {
    number: number;
    food: Food;
    totalFoodPrice: number;
}

export class OrderFoodResponse {
    message: string;
    bookingFood: BookingFood;
    staff: Staff;
}

