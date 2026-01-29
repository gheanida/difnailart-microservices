import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
  import { BookingsService } from './bookings.service';
  import { CreateBookingDto } from './dto/create-booking.dto';
  import { UpdateStatusDto } from './dto/update-status.dto';
  
  @ApiTags('bookings')
  @Controller('bookings')
  export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}
  
    // ===============================
    // CREATE BOOKING
    // POST /bookings
    // ===============================
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new booking' })
    @ApiBody({ type: CreateBookingDto })
    async create(@Body() createBookingDto: CreateBookingDto) {
      const booking = await this.bookingsService.create(createBookingDto);
  
      return {
        event: 'booking.created',
        data: {
          bookingId: booking.id,
          userId: booking.userId,
          serviceName: booking.serviceName,
          bookingDate: booking.bookingDate,
          bookingTime: booking.bookingTime,
          price: booking.price,
          status: booking.status,
        },
      };
    }
  
    // ===============================
    // GET USER BOOKINGS
    // GET /bookings
    // ===============================
    @Get()
    @ApiOperation({ summary: 'Get user bookings' })
    async findAll() {
      return this.bookingsService.findAll();
    }
  
    // ===============================
    // GET SERVICES
    // GET /bookings/services
    // ===============================
    @Get('services')
    @ApiOperation({ summary: 'Get nail art services' })
    async getServices() {
      return this.bookingsService.getServices();
    }
  
    // ===============================
    // UPDATE STATUS
    // PUT /bookings/:id/status
    // ===============================
    @Put(':id/status')
    @ApiOperation({ summary: 'Update booking status' })
    async updateStatus(
      @Param('id') id: number,
      @Body() updateStatusDto: UpdateStatusDto,
    ) {
      return this.bookingsService.updateStatus(id, updateStatusDto);
    }
  }
  