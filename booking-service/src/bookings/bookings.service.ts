import { Injectable, Logger } from '@nestjs/common';
// import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'; // Hapus jika tidak digunakan

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);
  
  // Hapus AmqpConnection dari constructor jika tidak digunakan
  // constructor(
  //   private readonly amqpConnection: AmqpConnection,
  // ) {}
  
  constructor() {} // Constructor kosong jika tidak perlu dependencies
  
  private bookings = [];
  private nailartServices = [
    { id: 1, name: 'Basic Manicure', price: 50000, duration: 60 },
    { id: 2, name: 'Gel Nail Art', price: 120000, duration: 90 },
    { id: 3, name: 'Acrylic Nails', price: 150000, duration: 120 },
  ];

  async create(bookingData: any) {
    const service = this.nailartServices.find(s => s.id === bookingData.serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    const booking = {
      id: Date.now(),
      ...bookingData,
      serviceName: service.name,
      price: service.price,
      duration: service.duration,
      status: 'pending',
      createdAt: new Date(),
    };

    this.bookings.push(booking);
    
    // Kirim event booking_created jika perlu
    // if (this.amqpConnection) {
    //   this.amqpConnection.publish('booking.events', 'booking.created', {
    //     event: 'booking.created',
    //     data: {
    //       bookingId: booking.id,
    //       userId: booking.userId,
    //       service: service.name,
    //     },
    //   });
    // }
    
    return booking;
  }

  async findAll() {
    return this.bookings;
  }
  

  async getServices() {
    return this.nailartServices;
  }

  async findByUser(userId: number) {
    return this.bookings.filter(booking => booking.userId === userId);
  }

  async updateStatus(id: number, updateStatusDto: { status: string }) {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) {
      return null;
    }
  
    const previousStatus = booking.status;
    booking.status = updateStatusDto.status;
    booking.updatedAt = new Date();
  
    return {
      ...booking,
      previousStatus,
    };
  }
  
}