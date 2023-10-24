
export class Bill {
    id: number;
    bookingId: number;
    amount: number;
    notes: string;
    paymentType: string;
    paymentDate: string;
    isPayment: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}