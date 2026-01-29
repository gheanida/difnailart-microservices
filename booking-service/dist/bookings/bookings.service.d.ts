import { OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService implements OnModuleInit {
    private userClient;
    constructor(userClient: ClientProxy);
    onModuleInit(): void;
    private bookings;
    private nailartServices;
    create(createBookingDto: CreateBookingDto): Promise<{
        serviceName: string;
        price: number;
        duration: number;
        status: string;
        createdAt: Date;
        userId: number;
        serviceId: number;
        bookingDate: string;
        bookingTime: string;
        notes?: string;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findByUser(userId: number): Promise<any[]>;
    updateStatus(id: number, status: string): Promise<any>;
}
