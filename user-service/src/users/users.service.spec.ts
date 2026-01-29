import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!',
    };

    const result = await service.create(userData);
    
    expect(result).toHaveProperty('id');
    expect(result.email).toBe(userData.email);
    expect(result.name).toBe(userData.name);
    expect(result).not.toHaveProperty('password'); // Password should be removed
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(Array.isArray(users)).toBe(true);
  });
});