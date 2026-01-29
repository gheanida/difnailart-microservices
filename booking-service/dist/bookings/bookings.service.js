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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let BookingsService = class BookingsService {
    constructor(userClient) {
        this.userClient = userClient;
        this.bookings = [];
        this.nailartServices = [
            { id: 1, name: 'Basic Manicure', price: 50000, duration: 60 },
            { id: 2, name: 'Gel Nail Art', price: 120000, duration: 90 },
            { id: 3, name: 'Acrylic Nails', price: 150000, duration: 120 },
            { id: 4, name: 'Nail Extension', price: 200000, duration: 150 },
        ];
    }
    onModuleInit() {
        this.userClient.connect();
    }
    async create(createBookingDto) {
        const userResponse = await this.userClient.send('get_user', { userId: createBookingDto.userId }).toPromise();
        if (!userResponse) {
            throw new Error('User not found');
        }
        const service = this.nailartServices.find(s => s.id === createBookingDto.serviceId);
        if (!service) {
            throw new Error('Service not found');
        }
        const booking = {
            id: Date.now(),
            ...createBookingDto,
            serviceName: service.name,
            price: service.price,
            duration: service.duration,
            status: 'pending',
            createdAt: new Date(),
        };
        this.bookings.push(booking);
        this.userClient.emit('booking_created', {
            bookingId: booking.id,
            userId: booking.userId,
            service: service.name,
            price: service.price,
        });
        return booking;
    }
    async findAll() {
        return this.bookings;
    }
    async findByUser(userId) {
        return this.bookings.filter(booking => booking.userId === userId);
    }
    async updateStatus(id, status) {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
            booking.status = status;
            this.userClient.emit('booking_status_updated', {
                bookingId: id,
                userId: booking.userId,
                status: status,
            });
            return booking;
        }
        return null;
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map