import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(id: string): Promise<any>;
}
