import { Food } from './food.model';

export class BookingFood {
    bookingFoodInfo?: BookingFoodInfo;
    totalBookingFoodPrice?: number;
}

export class BookingFoodInfo {
    id?: number;
    isConfirmed?: boolean;
    createdAt?: string;
    foods?: Food[];
}