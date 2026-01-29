import { IsInt, IsNotEmpty, IsString, Min, IsDateString, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user making the booking',
  })
  @IsInt()
  @Min(1, { message: 'User ID must be a positive number' })
  @IsNotEmpty({ message: 'User ID is required' })
  readonly userId: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the nailart service',
  })
  @IsInt()
  @Min(1, { message: 'Service ID must be a positive number' })
  @IsNotEmpty({ message: 'Service ID is required' })
  readonly serviceId: number;

  @ApiProperty({
    example: '2024-12-25',
    description: 'Booking date in YYYY-MM-DD format',
  })
  @IsString()
  @IsNotEmpty({ message: 'Booking date is required' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  readonly bookingDate: string;

  @ApiProperty({
    example: '14:00',
    description: 'Booking time in HH:MM format (24-hour)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Booking time is required' })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:MM format (24-hour)',
  })
  readonly bookingTime: string;

  @ApiProperty({
    example: 'I would like a floral design',
    description: 'Additional notes for the booking (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s.,!?-]{0,500}$/, {
    message: 'Notes can only contain letters, numbers, and basic punctuation',
  })
  readonly notes?: string;
}