import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({
    example: 'confirmed',
    description: 'New status for the booking',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
  })
  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(['pending', 'confirmed', 'completed', 'cancelled'], {
    message: 'Status must be one of: pending, confirmed, completed, cancelled',
  })
  readonly status: string;
}