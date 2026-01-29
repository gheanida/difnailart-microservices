"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let UsersService = class UsersService {
    constructor(bookingClient) {
        this.bookingClient = bookingClient;
        this.users = [];
    }
    async create(createUserDto) {
        const user = {
            id: Date.now(),
            ...createUserDto,
            createdAt: new Date(),
            role: 'customer',
        };
        this.users.push(user);
        this.bookingClient.emit('user_created', {
            userId: user.id,
            email: user.email,
            name: user.name,
        });
        return user;
    }
    async login(loginUserDto) {
        const user = this.users.find(u => u.email === loginUserDto.email && u.password === loginUserDto.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        this.bookingClient.emit('user_logged_in', {
            userId: user.id,
            timestamp: new Date(),
        });
        return { message: 'Login successful', user };
    }
    async findAll() {
        return this.users;
    }
    async findOne(id) {
        return this.users.find(user => user.id === id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BOOKING_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UsersService);
//# sourceMappingURL=users.service.js.map