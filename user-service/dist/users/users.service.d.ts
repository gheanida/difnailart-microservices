import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersService {
    private bookingClient;
    constructor(bookingClient: ClientProxy);
    private users;
    create(createUserDto: CreateUserDto): Promise<{
        createdAt: Date;
        role: string;
        name: string;
        email: string;
        password: string;
        phone?: string;
        id: number;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        message: string;
        user: any;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
}
