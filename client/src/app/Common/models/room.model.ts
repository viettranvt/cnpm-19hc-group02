import { RoomType } from './room_type.model';

export class Room {
    id: number;
    code: string;
    view: string;
    name: string;
    numOfBeds: number;
    price: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
