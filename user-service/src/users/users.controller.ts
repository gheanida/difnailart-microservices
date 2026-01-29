import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      example: {
        event: 'user.created',
        data: {
          userId: 123,
          email: 'user@example.com',
          name: 'John Doe',
          createdAt: '2024-01-29T10:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation error',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        errors: {
          email: 'Please provide a valid email',
          password: 'Password must be at least 6 characters'
        },
        timestamp: '2024-01-29T10:00:00.000Z'
      }
    }
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    return {
      event: 'user.created',
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      example: {
        event: 'user.logged_in',
        data: {
          userId: 123,
          email: 'user@example.com',
          timestamp: '2024-01-29T10:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid email or password',
        timestamp: '2024-01-29T10:00:00.000Z'
      }
    }
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.login(loginUserDto);
    
    return {
      event: 'user.logged_in',
      data: {
        userId: result.user.id,
        email: result.user.email,
        timestamp: new Date().toISOString(),
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of users',
    schema: {
      example: {
        event: 'users.retrieved',
        data: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'customer'
          }
        ],
        count: 1
      }
    }
  })
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      event: 'users.retrieved',
      data: users,
      count: users.length,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'User details',
    schema: {
      example: {
        event: 'user.retrieved',
        data: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'customer'
        }
      }
    }
  })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    return {
      event: 'user.retrieved',
      data: user,
    };
  }
}