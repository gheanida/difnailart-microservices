import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  readonly name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address',
  })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password with minimum 6 characters',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, {
    message: 'Password must contain at least one letter, one number and one special character',
  })
  readonly password: string;

  @ApiProperty({
    example: '+6281234567890',
    description: 'Phone number (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^[+]?[0-9\s\-\(\)]{10,}$/, {
    message: 'Please provide a valid phone number',
  })
  readonly phone?: string;
}