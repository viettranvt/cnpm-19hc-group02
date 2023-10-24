import { Room } from './room.model';

export class Booking {
    id?: number;
    roomId?: number;
    userId?: number;
    staffId?: number;
    price?: number;
    isCheckOut?: boolean;
    description?: string;
    startDate?: string;
    endDate?: string;
    updatedAt?: string;
    createdAt?: string;
    deletedAt?: any;
    room?: Room;
}
