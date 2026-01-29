import { Injectable, ConflictException } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

// Define UserCreatedEvent interface
interface UserCreatedEvent {
  userId: number;
  email: string;
  name: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  private users = [];

  async create(createUserDto: CreateUserDto) {
    // Check if email exists
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Create user object
    const user = {
      id: Date.now(),
      ...createUserDto,
      createdAt: new Date(),
      role: 'customer',
    };

    this.users.push(user);

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    // Kirim event user.created via RabbitMQ – SESUAI FORMAT SOAL
    const userEvent: UserCreatedEvent = {
      userId: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    try {
      // OPTIONAL: Menggunakan RPC pattern (request-response)
      // const rpcResponse = await this.amqpConnection.request({
      //   exchange: 'user.events',
      //   routingKey: 'user.created.rpc',
      //   payload: userEvent,
      // });
      // console.log('RPC Response:', rpcResponse);

      // Publish event untuk subscribers - FORMAT YANG DISARANKAN
      await this.amqpConnection.publish(
        'user.events',
        'user.created',
        {
          event: 'user.created', // SESUAI FORMAT SOAL
          data: userEvent, // SESUAI FORMAT SOAL
          timestamp: new Date().toISOString(),
        }
      );

      console.log('User created event published successfully');
    } catch (error) {
      console.error('Failed to publish user created event:', error);
    }

    return userWithoutPassword;
  }

  // Tambahkan method lainnya
  async findAll() {
    return this.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      return null;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = this.users.find(
      user => user.email === loginUserDto.email && user.password === loginUserDto.password
    );
    
    if (!user) {
      throw new ConflictException('Invalid credentials');
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}